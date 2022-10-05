<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Page;
use App\Models\Size;
use App\Models\Product;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\Eloquent\ProductRepository;
use Spatie\TranslationLoader\TranslationLoaders\Db;

class ProductController extends Controller
{

    protected $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    /**
     * @param string $locale
     * @param Request $request
     * @return Application|Factory|View
     */
    public function index(string $locale, Request $request)
    {
        $page = Page::where('key', 'products')->firstOrFail();
        $products = Product::with(['files', 'sizes'])->whereHas('categories', function (Builder $query) {
            $query->where('status', 1);
        })->paginate(12);

        $images = [];
        foreach ($page->sections as $sections) {
            if ($sections->file) {
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }
        }

        //dd($products);
        return Inertia::render('Products', [
            'products' => $products,
            "cat" => Category::all(),
            "sizes" => Size::all(),
            'images' => $images,
            'page' => $page,
            "seo" => [
                "title" => $page->meta_title,
                "description" => $page->meta_description,
                "keywords" => $page->meta_keyword,
                "og_title" => $page->meta_og_title,
                "og_description" => $page->meta_og_description,
                //            "image" => "imgg",
                //            "locale" => App::getLocale()
            ]
        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }


    /**
     * @param string $locale
     * @param string $slug
     * @return Application|Factory|View
     */
    public function show(string $locale, string $slug)
    {
        //\Illuminate\Support\Facades\DB::enableQueryLog();

        $product = Product::where(['status' => true, 'slug' => $slug])->whereHas('categories', function (Builder $query) {
            $query->where('status', 1);
        })->with(['latestImage', 'files', 'sizes', 'translations'])->firstOrFail();

        $productImages = $product->files()->orderBy('id', 'desc')->get();

        $result = [];


        $product['attributes'] = $result;

        //dd($product);


        //dd(last($product->categories));
        $categories = $product->categories;


        $path = [];
        $arr = [];
        foreach ($categories as $key => $item) {


            $ancestors = $item->ancestors;
            if (count($ancestors)) {
                foreach ($ancestors as $ancestor) {
                    $arr[count($ancestors)]['ancestors'][] = $ancestor;
                    $arr[count($ancestors)]['current'] = $item;
                }
            } else {
                $arr[0]['ancestors'] = [];
                $arr[0]['current'] = $item;
            }
        }

        $max = max(array_keys($arr));

        $k = 0;
        foreach ($arr[$max]['ancestors'] as $ancestor) {
            $path[$k]['id'] = $ancestor->id;
            $path[$k]['slug'] = $ancestor->slug;
            $path[$k]['title'] = $ancestor->title;
            $k++;
        }

        $path[$k]['id'] = $arr[$max]['current']->id;
        $path[$k]['slug'] = $arr[$max]['current']->slug;
        $path[$k]['title'] = $arr[$max]['current']->title;
        //dd($path);


        $similar_products = Product::where(['status' => 1, 'product_categories.category_id' => $path[0]['id']])
            ->where('products.id', '!=', $product->id)
            ->leftJoin('product_categories', 'product_categories.product_id', '=', 'products.id')
            ->inRandomOrder()
            ->groupBy('products.id')
            ->with('latestImage')->get();

        foreach ($similar_products as $_product) {
            $product_attributes = $_product->attribute_values;

            $_result = [];

            foreach ($product_attributes as $item) {
                $options = $item->attribute->options;
                $value = '';
                foreach ($options as $option) {
                    if ($item->attribute->type == 'select') {
                        if ($item->integer_value == $option->id) {
                            $_result[$item->attribute->code] = $option->label;
                        }
                    }
                }
            }
            $_product['attributes'] = $_result;
        }
        // dd(Product::with('latestImage', 'sizes', 'files', 'categories')->where('categories.id', '=', 1)->get());
        return Inertia::render('SingleProucts', [
            'sizes' => Size::all(),
            'product' => $product,
            "sameproduct" => Product::where('slug', '!=', $slug)->with('latestImage', 'sizes', 'files', 'categories')->latest()->limit(8)->get(),
            'category_path' => $path,
            'similar_products' => $similar_products,
            'product_images' => $productImages,
            'product_attributes' => $result,
            "seo" => [
                "title" => $product->meta_title,
                "description" => $product->meta_description,
                "keywords" => $product->meta_keyword,
                "og_title" => $product->meta_og_title,
                "og_description" => $product->meta_og_description,
                //            "image" => "imgg",
                //            "locale" => App::getLocale()
            ]
        ])->withViewData([
            'meta_title' => $product->meta_title,
            'meta_description' => $product->meta_description,
            'meta_keyword' => $product->meta_keyword,
            "image" => $product->file,
            'og_title' => $product->meta_og_title,
            'og_description' => $product->meta_og_description
        ]);
    }
}
