<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;

use App\Models\Page;
use Illuminate\Auth\Events\PasswordReset;
use App\Models\Partner;
use App\Models\User;
use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Repositories\Eloquent\GalleryRepository;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    protected $galleryRepository;

    public function __construct(GalleryRepository $galleryRepository)
    {
        $this->galleryRepository = $galleryRepository;
    }

    public function loginView(Request $request)
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

        $files = [];
        if ($page->images) $files = $page->files;

        //dd($files);

        return Inertia::render('Login', [
            'error' => $request->session()->get('error'),
            "page" => $page, "seo" => [
                "title" => $page->meta_title,
                "description" => $page->meta_description,
                "keywords" => $page->meta_keyword,
                "og_title" => $page->meta_og_title,
                "og_description" => $page->meta_og_description,
                //            "image" => "imgg",
                //            "locale" => App::getLocale()
            ], 'gallery_img' => $files, 'images' => $images
        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }

    public function login(Request $request)
    {
        // $credentials = $request->validate([
        //     'email' => ['required', 'email'],
        //     'password' => ['required'],
        // ]);

        // if (Auth::attempt($credentials)) {
        //     $request->session()->regenerate();

        //     return redirect()->back();
        // }

        // return back()->withErrors([
        //     'email' => 'The provided credentials do not match our records.',
        // ]);
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        // dd($credentials);
        $remember = false;
        if ($request->remember == "on") {
            $remember = true;
        }

        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();
            // dd(Auth::user());
            // return redirect()->intended('client.cabinet');
            return redirect(route("client.cabinet"));
        } else {
            // return 'Incorrect mail or password !';
            return redirect()->back()->with('error', 'Incorrect mail or password !');
        }
    }

    public function cabinet()
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

        //        dd($page->file);
        //        dd(App::getLocale());
        // $_products = app(ProductRepository::class)->getHomePageProducts();

        // $products = [];
        // $products['new_collection'] = [];
        // $products['bunker'] = [];
        // $products['day_product'] = [];
        // $products['day_price'] = [];
        // $products['special_price_tag'] = [];
        // $products['popular'] = [];
        // foreach ($_products as $product) {
        //     $product_attributes = $product->attribute_values;

        //     $_result = [];

        //     foreach ($product_attributes as $item) {
        //         $options = $item->attribute->options;
        //         $value = '';
        //         foreach ($options as $option) {
        //             if ($item->attribute->type == 'select') {
        //                 if ($item->integer_value == $option->id) {
        //                     $_result[$item->attribute->code] = $option->label;
        //                 }
        //             }
        //         }
        //     }
        //     $product['attributes'] = $_result;

        //     if ($product->new_collection) $products['new_collection'][] = $product;
        //     if ($product->bunker) $products['bunker'][] = $product;
        //     if ($product->day_product) $products['day_product'][] = $product;
        //     if ($product->day_price) $products['day_price'][] = $product;
        //     if ($product->special_price_tag) $products['special_price_tag'][] = $product;
        //     if ($product->popular) $products['popular'][] = $product;
        // }

        //dd($products);

        return Inertia::render('Account', [
            "city" => city::with("translations")->get(),
            "page" => $page, "seo" => [
                "title" => $page->meta_title,
                "description" => $page->meta_description,
                "keywords" => $page->meta_keyword,
                "og_title" => $page->meta_og_title,
                "og_description" => $page->meta_og_description,

                //            "image" => "imgg",
                //            "locale" => App::getLocale()
            ],
            // 'products' => $products,
            'images' => $images
        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }


    public function registrationView()
    {
        $page = Page::where('key', 'about')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections) {
            if ($sections->file) {
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }
        }

        $files = [];
        if ($page->images) $files = $page->files;

        //dd($files);

        return Inertia::render('Signup', ["page" => $page, "seo" => [
            "title" => $page->meta_title,
            "description" => $page->meta_description,
            "keywords" => $page->meta_keyword,
            "og_title" => $page->meta_og_title,
            "og_description" => $page->meta_og_description,
            //            "image" => "imgg",
            //            "locale" => App::getLocale()
        ], 'gallery_img' => $files, 'images' => $images])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }

    public function createAccount(Request $request)
    {

        $request->validate([
            'name' => 'required',
            'surname' => 'required',
            // 'id' => 'required|unique:users,id_number',
            'phone' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:3',
            'password_repeat' => 'required|same:password',
            // 'agree' => Rule::in([true]),
        ]);
        $attributes = $request->except(['agree']);
        $attributes['password'] = Hash::make($request->post('password'));
        $attributes['affiliate_id'] = (string) Str::uuid();
        $attributes['referred_by'] = $request->cookie('referral');

        // User::query()->create($attributes);
        User::create([
            "name" => $attributes['name'],
            "surname" => $attributes['surname'],
            "phone" => $attributes['phone'],
            "email" => $attributes['email'],
            "password" => $attributes['password'],
        ]);

        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            // dd(Auth::user());
            // return redirect()->intended('client.cabinet');
            return redirect(route("client.cabinet"));
        } else {
            // return 'Incorrect mail or password !';
            return redirect()->back()->with('error', 'Incorrect mail or password !');
        }
        // return redirect()->back()->with('success', 'registered');
    }

    public function updateuser(Request $request)
    {
        if (isset($request->q)) {
            $saveData = $request->except(['q', '_token']);
        } else {
            $saveData = $request->except('_token');
        }
        $saveData['password'] = Hash::make($request->post('password'));
        $userid = User::where('id', Auth::user()->id)->update($saveData);
        return back()->with('success', 'success');
    }


    public function partnerLoginView()
    {
        $page = Page::where('key', 'about')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections) {
            if ($sections->file) {
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }
        }

        $files = [];
        if ($page->images) $files = $page->files;

        //dd($files);

        return Inertia::render('PartnerSignin', ["page" => $page, "seo" => [
            "title" => $page->meta_title,
            "description" => $page->meta_description,
            "keywords" => $page->meta_keyword,
            "og_title" => $page->meta_og_title,
            "og_description" => $page->meta_og_description,
            //            "image" => "imgg",
            //            "locale" => App::getLocale()
        ], 'gallery_img' => $files, 'images' => $images])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }

    public function partnerLogin(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);
        $partner = Partner::query()->where('username', $request->post('username'))->first();

        if ($partner) {
            if (Hash::check($request->post('password'), $partner->user->password)) {
                //dd($partner->user->password);
                Auth::loginUsingId($partner->user_id);
                return redirect()->back();
            } else {
                return back()->withErrors(['username' => 'wrong']);
            }
        } else {
            return back()->withErrors(['username' => 'wrong']);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('client.home.index');
    }

    // forgot password

    public function forgotPass(Request $request)
    {
        $page = Page::where('key', 'about')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections) {
            if ($sections->file) {
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }
        }

        $files = [];
        if ($page->images) $files = $page->files;

        //dd($files);

        return Inertia::render('ForgotPassword', [
            "err" => $request->session()->get('err'),
            "page" => $page,
            "status" =>  $request->session()->get('status'),
            "email" =>  $request->session()->get('email'),
            "seo" => [
                "title" => $page->meta_title,
                "description" => $page->meta_description,
                "keywords" => $page->meta_keyword,
                "og_title" => $page->meta_og_title,
                "og_description" => $page->meta_og_description,
                //            "image" => "imgg",
                //            "locale" => App::getLocale()
            ], 'gallery_img' => $files, 'images' => $images
        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }

    public function recoveryPass($token)
    {
        $page = Page::where('key', 'about')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections) {
            if ($sections->file) {
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }
        }

        $files = [];
        if ($page->images) $files = $page->files;

        //dd($files);

        return Inertia::render('ChangePassword', [
            "token" => $token,
            "page" => $page,
            "status" =>  $request->session()->get('status'),
            "email" =>  $request->session()->get('email'),
            "seo" => [
                "title" => $page->meta_title,
                "description" => $page->meta_description,
                "keywords" => $page->meta_keyword,
                "og_title" => $page->meta_og_title,
                "og_description" => $page->meta_og_description,
                //            "image" => "imgg",
                //            "locale" => App::getLocale()
            ], 'gallery_img' => $files, 'images' => $images
        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
        // return view('auth.reset-password', ['token' => $token]);
    }

    public function UpdatePass(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? redirect()->route('login')->with('status', __($status))
            : back()->withErrors(['email' => [__($status)]]);
    }

}





