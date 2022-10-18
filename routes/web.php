<?php

/**
 *  routes/web.php
 *
 * Date-Time: 03.06.21
 * Time: 15:41
 * @author Insite LLC <hello@insite.international>
 */

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\SizeController;
use App\Http\Controllers\Admin\LanguageController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SliderController;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\Admin\TranslationController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CKEditorController;
use App\Http\Controllers\Client\HomeController;
use App\Http\Controllers\Client\ContactController;
use App\Http\Controllers\Client\AboutUsController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::post('ckeditor/image_upload', [CKEditorController::class, 'upload'])->name('upload');

Route::any('bog/callback/status', [\App\BogPay\BogCallbackController::class, 'status'])->withoutMiddleware('web')->name('bogCallbackStatus');
Route::any('bog/callback/refund', [\App\BogPay\BogCallbackController::class, 'refund'])->withoutMiddleware('web')->name('bogCallbackRefund');

Route::redirect('', config('translatable.fallback_locale'));
Route::prefix('{locale?}')
    ->middleware(['setlocale'])
    ->group(function () {
        Route::prefix('adminpanel')->group(function () {
            Route::get('login', [LoginController::class, 'loginView'])->name('loginView');
            Route::post('login', [LoginController::class, 'login'])->name('login');


            Route::middleware('auth')->group(function () {
                Route::get('logout', [LoginController::class, 'logout'])->name('logout');

                Route::redirect('', 'adminpanel/language');

                // users
                Route::resource('user', \App\Http\Controllers\Admin\UserController::class);
                Route::get('user/{user}/destroy', [\App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('user.destroy');

                // Language
                Route::resource('language', LanguageController::class);
                Route::get('language/{language}/destroy', [LanguageController::class, 'destroy'])->name('language.destroy');

                // Translation
                Route::resource('translation', TranslationController::class);

                // Category
                Route::resource('category', \App\Http\Controllers\Admin\CategoryController::class);
                Route::get('category/{category}/destroy', [\App\Http\Controllers\Admin\CategoryController::class, 'destroy'])->name('category.destroy');
                //
                // Product
                Route::resource('product', \App\Http\Controllers\Admin\ProductController::class);
                Route::get('product/{product}/destroy', [\App\Http\Controllers\Admin\ProductController::class, 'destroy'])->name('product.destroy');
                Route::post('product/{product?}/upload-cropped', [\App\Http\Controllers\Admin\ProductController::class, 'uploadCropped'])->name('product.crop-upload');
                //                // Gallery
                Route::resource('gallery', GalleryController::class);
                Route::get('gallery/{gallery}/destroy', [GalleryController::class, 'destroy'])->name('gallery.destroy');


                //city
                Route::resource('city', \App\Http\Controllers\Admin\CityController::class);
                Route::get('city/{city}/destroy', [\App\Http\Controllers\Admin\CityController::class, 'destroy'])->name('city.destroy');


                // Slider
                Route::resource('slider', SliderController::class);
                Route::get('slider/{slider}/destroy', [SliderController::class, 'destroy'])->name('slider.destroy');

                // Page
                Route::resource('page', PageController::class);
                Route::get('page/{page}/destroy', [PageController::class, 'destroy'])->name('page.destroy');


                Route::get('setting/active', [SettingController::class, 'setActive'])->name('setting.active');
                // Setting
                Route::resource('setting', SettingController::class);
                Route::get('setting/{setting}/destroy', [SettingController::class, 'destroy'])->name('setting.destroy');


                Route::resource('order', \App\Http\Controllers\Admin\OrderController::class);
                //Route::get('order/{order}/destroy', [\App\Http\Controllers\Admin\OrderController::class, 'destroy'])->name('order.destroy');
                Route::get("updateorderfinish{id?}", [\App\Http\Controllers\Admin\OrderController::class, 'updateFinishedOrder'])->name('order.updateFinishedOrder');

                Route::get("colors", [SizeController::class, 'index'])->name('color.index');
                Route::get("addcolorspage{id?}", [SizeController::class, 'addColorsPage'])->name('size.form');
                Route::post("addcolors", [SizeController::class, 'addColor'])->name('size.create');
                Route::post("updateSize", [SizeController::class, 'updateSize'])->name('size.update');
                Route::get("delSize{id?}", [SizeController::class, 'delSize'])->name('size.destroy');

                // Password
                Route::get('password', [\App\Http\Controllers\Admin\PasswordController::class, 'index'])->name('password.index');
                Route::post('password', [\App\Http\Controllers\Admin\PasswordController::class, 'update'])->name('password.update');

                Route::resource('attribute', \App\Http\Controllers\Admin\AttributeController::class);
                Route::get('attribute/{attribute}/destroy', [\App\Http\Controllers\Admin\AttributeController::class, 'destroy'])->name('attribute.destroy');
            });
        });
        Route::middleware(['active'])->group(function () {

            // Route::get('client/cabinet', [\App\Http\Controllers\Client\UserController::class, 'index'])->name('client.cabinet');
            // Home Page
            Route::get('', [HomeController::class, 'index'])->name('client.home.index');
            // Contact Page
            Route::get('/contact', [ContactController::class, 'index'])->name('client.contact.index');
            Route::post('/contact-us', [ContactController::class, 'mail'])->name('client.contact.mail');


            //galery
            Route::get("gallery", [HomeController::class, "gallery"])->name('client.gallery.index');
            Route::get("gallery/{gallery}", [HomeController::class, "show"])->name('client.galleryshow.index');


            // About Page
            Route::get('about', [AboutUsController::class, 'index'])->name('client.about.index');
            // conditions
            Route::get('conditions', [AboutUsController::class, 'conditions'])->name('client.conditions.index');


            // Product Page
            Route::get('products', [\App\Http\Controllers\Client\ProductController::class, 'index'])->name('client.product.index');
            Route::get('product/{product}', [\App\Http\Controllers\Client\ProductController::class, 'show'])->name('client.product.show');

            Route::get('category/{category}', [\App\Http\Controllers\Client\CategoryController::class, 'show'])->name('client.category.show');
            Route::get('popular', [\App\Http\Controllers\Client\CategoryController::class, 'popular'])->name('client.category.popular');
            Route::get('special', [\App\Http\Controllers\Client\CategoryController::class, 'special'])->name('client.category.special');
            Route::get('new', [\App\Http\Controllers\Client\CategoryController::class, 'new'])->name('client.category.new');

            //checkout
            Route::get('cart', [\App\Http\Controllers\Client\CartController::class, 'index'])->name('client.cart.index');
            Route::get('checkout', [\App\Http\Controllers\Client\OrderController::class, 'index'])->name('client.checkout.index')->middleware('orderCheck');
            Route::post('checkout', [\App\Http\Controllers\Client\OrderController::class, 'order'])->name('client.checkout.order')->middleware('orderCheck');
            Route::get('order/success', [\App\Http\Controllers\Client\OrderController::class, 'statusSuccess'])->name('order.success');
            Route::get('order/failure', [\App\Http\Controllers\Client\OrderController::class, 'statusFail'])->name('order.failure');

            Route::get('search', [\App\Http\Controllers\Client\SearchController::class, 'index'])->name('search.index');

            Route::any('payments/bog/status', [\App\Http\Controllers\Client\OrderController::class, 'bogResponse'])->name('bogResponse');

            Route::get('cabinet', [\App\Http\Controllers\Client\AuthController::class, 'cabinet'])->name('client.cabinet');
            Route::get('orderhistory', [\App\Http\Controllers\Client\HomeController::class, 'orderhistory'])->name('client.orderhistory');
            Route::get('orderDetails/{id?}', [\App\Http\Controllers\Client\HomeController::class, 'orderDetails'])->name('client.orderDetails');
            Route::post('updateuser', [\App\Http\Controllers\Client\AuthController::class, 'updateuser'])->name('client.updateuser');




            Route::middleware(['guest'])->group(function () {
                Route::get('login', [\App\Http\Controllers\Client\AuthController::class, 'loginView'])->name('client.login.index')->middleware('guest');
                Route::post('login', [\App\Http\Controllers\Client\AuthController::class, 'login'])->name('client.login');
                Route::get('registration', [\App\Http\Controllers\Client\AuthController::class, 'registrationView'])->name('client.registration.index');
                Route::post('registration', [\App\Http\Controllers\Client\AuthController::class, 'createAccount'])->name('client.register');
            });
            // Route::get('login', [\App\Http\Controllers\Client\AuthController::class, 'loginView'])->name('client.login.index')->middleware('guest_client');


            // password recovery
            Route::get('/forgot-password', [\App\Http\Controllers\Client\AuthController::class, 'forgotPass'])->middleware('guest')->name('password.request');

            Route::post('/forgot-password', function (Request $request) {
                $request->validate(['email' => 'required|email']);
                if (User::where('email', $request->email)->first() == null) {
                    return redirect()->back()->with('err', 'მომხმარებელი ამ მეილით არ არსებობს');
                } else {
                    $status = Password::sendResetLink(
                        $request->only('email')
                    );
                    return $status === Password::RESET_LINK_SENT
                        ? back()->with(['status' => __($status)])
                        : back()->withErrors(['email' => __($status)]);
                }
            })->middleware('guest')->name('password.email');


            Route::get('/reset-password/{token}', [\App\Http\Controllers\Client\AuthController::class, 'recoveryPass'])->middleware('guest')->name('password.reset');
            Route::get('/reset-password', [\App\Http\Controllers\Client\AuthController::class, 'UpdatePass'])->middleware('guest')->name('password.update');

            Route::get('logout', [\App\Http\Controllers\Client\AuthController::class, 'logout'])->name('logout');
            /*Route::get('test/{method}',function ($locale,$method,\App\Http\Controllers\TestController $testController){

                return $testController->{$method}();
            });

            Route::post('test/filter',[\App\Http\Controllers\TestController::class,'filter']);*/
        });

        //Social-------------------------------------------------------
        Route::get('/auth/facebook/redirect', function () {
            return Socialite::driver('facebook')->redirect();
        })->name('fb-redirect');

        Route::get('/auth/facebook/callback', function () {
            //dd('jdfhgjdhjf urkl');
            $facebookUser = Socialite::driver('facebook')->stateless()->user();

            //dd($facebookUser);
            $email = uniqid();
            if ($facebookUser->email !== null) $email = $facebookUser->email;
            $user = User::updateOrCreate([
                'facebook_id' => $facebookUser->id,

            ], [
                'email' => $email,
                'name' => $facebookUser->name,
                'facebook_id' => $facebookUser->id,
                'facebook_token' => $facebookUser->token,
                'facebook_refresh_token' => $facebookUser->refreshToken,
                'avatar' => $facebookUser->avatar,
            ]);



            //dd($user);

            Auth::login($user);

            return redirect(route('profile'));
        })->name('fb-callback');

        Route::get('/auth/google/redirect', function () {
            return Socialite::driver('google')->redirect();
        })->name('google-redirect');

        Route::get('/auth/google/callback', function () {
            $googleUser = Socialite::driver('google')->user();

            //dd($googleUser);
            $user = User::updateOrCreate([
                //'facebook_id' => $facebookUser->id,
                'email' => $googleUser->email,
            ], [
                'name' => $googleUser->name,
                'google_id' => $googleUser->id,
                'google_token' => $googleUser->token,
                'google_refresh_token' => $googleUser->refreshToken,
                'avatar' => $googleUser->avatar,
            ]);


            //dd($user);

            Auth::login($user);

            return redirect(route('profile'));
        })->name('google-callback');
        //--------------------------------------------------------------------------
    });
