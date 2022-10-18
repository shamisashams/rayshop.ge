<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Slider;
use App\Models\Order;
use App\Models\OrderItems;
use App\Models\Size;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\OrderItem;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use App\Models\ProductCategory;
use App\Repositories\Eloquent\ProductRepository;


class HomeController extends Controller
{
    public function index()
    {


        $page = Page::where('key', 'home')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections) {
            if ($sections->file) {
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }
        }

        $sliders = Slider::query()->where("status", 1)->with(['file', 'translations', 'product']);
        //        dd($page->file);
        //        dd(App::getLocale());
        $_products = app(ProductRepository::class)->getHomePageProducts();

        $products = [];
        $products['new_collection'] = [];
        $products['bunker'] = [];
        $products['day_product'] = [];
        $products['day_price'] = [];
        $products['special_price_tag'] = [];
        $products['popular'] = [];
        foreach ($_products as $product) {
            $product_attributes = $product->attribute_values;

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
            $product['attributes'] = $_result;

            if ($product->new_collection) $products['new_collection'][] = $product;
            if ($product->bunker) $products['bunker'][] = $product;
            if ($product->day_product) $products['day_product'][] = $product;
            if ($product->day_price) $products['day_price'][] = $product;
            if ($product->special_price_tag) $products['special_price_tag'][] = $product;
            if ($product->popular) $products['popular'][] = $product;
        }

        //dd($products);
        $productcostum = Product::where(['status' => true])->whereHas('categories', function (Builder $query) {
            $query->where('status', 1);
        })->with(['latestImage', 'files', 'sizes'])->get();

        return Inertia::render('Home', [
            'products' => $products,
            'productsCat' => ProductCategory::all(),
            'product' => $productcostum,
            'productsAll' => Product::with(["translations", 'files'])->take(8)->get(),
            "sliders" => $sliders->get(),
            "category" => Category::with("translations")->get(),
            "sizes" => Size::all(),
            "gallery" => Gallery::with("file")->get()->take(8),
            "page" => $page, "seo" => [
                "title" => $page->meta_title,
                "description" => $page->meta_description,
                "keywords" => $page->meta_keyword,
                "og_title" => $page->meta_og_title,
                "og_description" => $page->meta_og_description,

                //            "image" => "imgg",
                //            "locale" => App::getLocale()
            ], 'products' => $products, 'images' => $images
        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }



    public function gallery(Request $request)
    {
        $page = Page::where('key', 'home')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections) {
            if ($sections->file) {
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }
        }

        $sliders = Slider::query()->where("status", 1)->with(['file', 'translations', 'product']);
        //        dd($page->file);
        //        dd(App::getLocale());
        $_products = app(ProductRepository::class)->getHomePageProducts();

        $products = [];
        $products['new_collection'] = [];
        $products['bunker'] = [];
        $products['day_product'] = [];
        $products['day_price'] = [];
        $products['special_price_tag'] = [];
        $products['popular'] = [];
        foreach ($_products as $product) {
            $product_attributes = $product->attribute_values;

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
            $product['attributes'] = $_result;

            if ($product->new_collection) $products['new_collection'][] = $product;
            if ($product->bunker) $products['bunker'][] = $product;
            if ($product->day_product) $products['day_product'][] = $product;
            if ($product->day_price) $products['day_price'][] = $product;
            if ($product->special_price_tag) $products['special_price_tag'][] = $product;
            if ($product->popular) $products['popular'][] = $product;
        }

        //dd($products);
        $productcostum = Product::where(['status' => true])->whereHas('categories', function (Builder $query) {
            $query->where('status', 1);
        })->with(['latestImage', 'files', 'sizes'])->get();

        return Inertia::render('Gallery', [
            'products' => $products,
            'product' => $productcostum,
            'productsAll' => Product::with(["translations", 'files'])->take(8)->get(),
            "sliders" => $sliders->get(),
            "category" => Category::with("translations")->get(),
            "sizes" => Size::all(),
            "gallery" => Gallery::with("file")->paginate(8),
            "page" => $page, "seo" => [
                "title" => $page->meta_title,
                "description" => $page->meta_description,
                "keywords" => $page->meta_keyword,
                "og_title" => $page->meta_og_title,
                "og_description" => $page->meta_og_description,

                //            "image" => "imgg",
                //            "locale" => App::getLocale()
            ], 'products' => $products, 'images' => $images
        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }

    public function show(string $locale, $slug)
    {
        $gallery = Gallery::where("id", $slug)->with(['file'])->firstOrFail();
        // dd($news);
        // $lastNews = News::where("status", 1)->where('slug', '<>', $slug)->latest()->with(["file", "translations"])->take(3)->get();
        $page = Page::where('key', 'home')->firstOrFail();

        return Inertia::render('SingleGallery', [
            'news' => $gallery,
            'back' => url()->previous(),
            "seo" => [
                "og_title" => $page->meta_og_title,
                "og_description" => $page->meta_og_description,
                //            "image" => "imgg",
                //            "locale" => App::getLocale()
            ]
        ])->withViewData([
            'meta_title' => $gallery->meta_title ?? $page->meta_title,
            'meta_description' => $gallery->meta_description ?? $page->meta_description,
            'meta_keyword' => $gallery->meta_keyword ?? $page->meta_keyword,
            "image" => $gallery->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }

    public function orderDetails(string $locale, string $slug)
    {

        $page = Page::where('key', 'home')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections) {
            if ($sections->file) {
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }
        }

        $sliders = Slider::query()->where("status", 1)->with(['file', 'translations', 'product']);
        //        dd($page->file);
        //        dd(App::getLocale());
        $_products = app(ProductRepository::class)->getHomePageProducts();

        $products = [];
        $products['new_collection'] = [];
        $products['bunker'] = [];
        $products['day_product'] = [];
        $products['day_price'] = [];
        $products['special_price_tag'] = [];
        $products['popular'] = [];
        foreach ($_products as $product) {
            $product_attributes = $product->attribute_values;

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
            $product['attributes'] = $_result;

            if ($product->new_collection) $products['new_collection'][] = $product;
            if ($product->bunker) $products['bunker'][] = $product;
            if ($product->day_product) $products['day_product'][] = $product;
            if ($product->day_price) $products['day_price'][] = $product;
            if ($product->special_price_tag) $products['special_price_tag'][] = $product;
            if ($product->popular) $products['popular'][] = $product;
        }

        //dd($products);
        $productcostum = Product::where(['status' => true])->whereHas('categories', function (Builder $query) {
            $query->where('status', 1);
        })->with(['latestImage', 'files', 'sizes'])->get();

        return Inertia::render('OrderDetails', [

            "order" => order::where('id', $slug)->first(),
            "orderitems" => OrderItem::where("order_id", $slug)->get(),
            "category" => Category::with("translations")->get(),
            "page" => $page, "seo" => [
                "title" => $page->meta_title,
                "description" => $page->meta_description,
                "keywords" => $page->meta_keyword,
                "og_title" => $page->meta_og_title,
                "og_description" => $page->meta_og_description,

                //            "image" => "imgg",
                //            "locale" => App::getLocale()
            ], 'products' => $products, 'images' => $images
        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }


    public function orderHistory()
    {


        $page = Page::where('key', 'home')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections) {
            if ($sections->file) {
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }
        }

        $sliders = Slider::query()->where("status", 1)->with(['file', 'translations', 'product']);
        //        dd($page->file);
        //        dd(App::getLocale());
        $_products = app(ProductRepository::class)->getHomePageProducts();

        $products = [];
        $products['new_collection'] = [];
        $products['bunker'] = [];
        $products['day_product'] = [];
        $products['day_price'] = [];
        $products['special_price_tag'] = [];
        $products['popular'] = [];
        foreach ($_products as $product) {
            $product_attributes = $product->attribute_values;

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
            $product['attributes'] = $_result;

            if ($product->new_collection) $products['new_collection'][] = $product;
            if ($product->bunker) $products['bunker'][] = $product;
            if ($product->day_product) $products['day_product'][] = $product;
            if ($product->day_price) $products['day_price'][] = $product;
            if ($product->special_price_tag) $products['special_price_tag'][] = $product;
            if ($product->popular) $products['popular'][] = $product;
        }

        //dd($products);
        $productcostum = Product::where(['status' => true])->whereHas('categories', function (Builder $query) {
            $query->where('status', 1);
        })->with(['latestImage', 'files', 'sizes'])->get();

        return Inertia::render('OrderHistory', [
            "orders" => order::where([
                ['user_id', auth()->user()->id],
                ['status', 'success']
            ])->paginate(5),
            "page" => $page, "seo" => [
                "title" => $page->meta_title,
                "description" => $page->meta_description,
                "keywords" => $page->meta_keyword,
                "og_title" => $page->meta_og_title,
                "og_description" => $page->meta_og_description,

                //            "image" => "imgg",
                //            "locale" => App::getLocale()
            ], 'products' => $products, 'images' => $images
        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }
}
