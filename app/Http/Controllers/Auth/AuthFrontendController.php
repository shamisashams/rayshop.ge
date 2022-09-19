<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Request\LoginFrontRequest;
use App\Http\Request\LoginRequest;
use App\Http\Request\RegisterRequest;
use App\Models\User;
use App\Repositories\Frontend\AuthRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;


class AuthFrontendController extends Controller
{
    protected $authRepository;

    public function __construct(AuthRepositoryInterface $authRepository)
    {
        $this->authRepository = $authRepository;
    }


//    public function __construct(AuthService $service)
//    {
//        $this->service = $service;
//    }
    /**
     * Show specified view.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response
     */
    public function loginView()
    {
       return  $this->authRepository->view();
    }

    /**
     * Authenticate login user.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(LoginFrontRequest $request)
    {
       return $this->authRepository->login($request);
    }
    // Facebook Sociallite
//    public function facebook(){
//        return Socialite::driver('facebook')->redirect();
//    }
//    public function facebookredirect()
//    {
//        $user = Socialite::driver('facebook')->stateless()->user() ?? null;
//        if ($user) {
//            $user = User::firstOrCreate([
//                'email' => $user->email
//            ], [
//                'name' => $user->name,
//                'email' => $user->email,
//                'password' => Hash::make(Str::random(24)),
//                'status' => 1
//            ]);
//            Auth::login($user);
//        }
//        return redirect(route('welcome',app()->getLocale()));
//    }
    // Google Sociallite
//    public function google(){
//        return Socialite::driver('google')->redirect();
//    }
//    public function googleredirect()
//    {
//
//        $user = Socialite::driver('google')->user();
//        $user = User::firstOrCreate([
//            'email' => $user->email
//        ], [
//            'name' => $user->name,
//            'email' => $user->email,
//            'password' => Hash::make(Str::random(24)),
//            'status' => 1
//        ]);
//        Auth::login($user);
//        return redirect(route('welcome',app()->getLocale()));
//    }

    public function register($locale, RegisterRequest $request)
    {
        if($this->authRepository->register($locale,$request)) {
            return redirect()->back()->with('status','success');
        }

    }

    /**
     * Logout user.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {

        if (Auth::user()) {
            Auth::logout();
        }
        return redirect()->route('loginViewFront', app()->getLocale());
    }

    public function verify($locale, $token)
    {
        $data = explode('|', $token);
        $user = User::findOrFail($data[0]);
        if ($user->status == 1 || Auth::user()) {
            return redirect()->route('welcome', app()->getLocale());
        }
        $tokens = $user->tokens()->where('validate_till', '>=', Carbon::now())->get();
        if (count($tokens) > 0) {
            foreach ($tokens as $item) {
                if (Hash::check($data[1], $item->token)) {
                    $user->status = 1;
                    $user->save();
                    break;
                }
            }
        } else {
            $user->delete();
        }
        return redirect()->route('welcome', app()->getLocale());
    }
}
