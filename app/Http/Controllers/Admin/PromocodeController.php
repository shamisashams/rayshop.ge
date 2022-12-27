<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SliderRequest;
use App\Models\City;
use App\Models\PromoCode;
use App\Models\Slider;

use App\Repositories\Eloquent\CityRepository;
use App\Repositories\Eloquent\PromocodeRepository;

use App\Repositories\SliderRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class PromocodeController extends Controller
{

    private $promocodeRepository;


    public function __construct(
        PromocodeRepository $promocodeRepository
    )
    {
        $this->promocodeRepository = $promocodeRepository;

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response
     */
    public function index(SliderRequest $request)
    {
        /*return view('admin.pages.slider.index', [
            'sliders' => $this->slideRepository->getData($request, ['translations'])
        ]);*/

        return view('admin.nowa.views.promocode.index', [
            'data' => $this->promocodeRepository->getData($request)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response
     */
    public function create()
    {
        $slider = $this->promocodeRepository->model;

        $url = locale_route('promocode.store', [], false);
        $method = 'POST';

        /*return view('admin.pages.slider.form', [
            'slider' => $slider,
            'url' => $url,
            'method' => $method,
        ]);*/
        $pc = new \App\Promocode\Promocode();
        do{

            $promocode = $pc->generateCode();
            //dd($promocode);
        }while(Promocode::where("promocode", "=", $promocode)->first());

        //dd($promocode);
        return view('admin.nowa.views.promocode.form', [
            'model' => $slider,
            'url' => $url,
            'method' => $method,
            'cities' => City::with('translation')->get(),
            'promocode' => $promocode
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\Admin\ProductRequest $request
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     * @throws \ReflectionException
     */
    public function store(Request $request)
    {
        $request->validate([
            'discount' => 'required'
        ]);

        $saveData = $request->except('_token');
        //$saveData['status'] = isset($saveData['status']) && (bool)$saveData['status'];
        //dd($saveData);

        $slider = $this->promocodeRepository->create($saveData);

        // Save Files
        if ($request->hasFile('images')) {
            $slider = $this->promocodeRepository->saveFiles($slider->id, $request);
        }

        return redirect(locale_route('promocode.index', $slider->id))->with('success', __('admin.create_successfully'));

    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param string $locale
     * @param \App\Models\Category $category
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function edit(string $locale, Promocode $promocode)
    {
        $url = locale_route('promocode.update', $promocode->id, false);
        $method = 'PUT';

        /*return view('admin.pages.slider.form', [
            'slider' => $slider,
            'url' => $url,
            'method' => $method,
        ]);*/

        $pc = new \App\Promocode\Promocode();
        do{

            $promocode_ = $pc->generateCode();
            //dd($promocode);
        }while(Promocode::where("promocode", "=", $promocode_)->first());

        return view('admin.nowa.views.promocode.form', [
            'model' => $promocode,
            'url' => $url,
            'method' => $method,
            'promocode' => $promocode_
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\Admin\CategoryRequest $request
     * @param string $locale
     * @param \App\Models\Category $category
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function update(Request $request, string $locale, Promocode $promocode)
    {
        $request->validate([
            'discount' => 'required'
        ]);
        $saveData = Arr::except($request->except('_token'), []);
        //$saveData['status'] = isset($saveData['status']) && (bool)$saveData['status'];

        /*if($saveData['type'] == 'cart'){
            if(PromoCode::where('type','cart')->count() > 0){
                return redirect()->back()->with('danger','you can create only one promocode of type cart');
            }
        }*/

        $this->promocodeRepository->update($promocode->id, $saveData);

        //$this->promoCodeRepository->saveFiles($promoCode->id, $request);


        return redirect(locale_route('promocode.index', $promocode->id))->with('success', __('admin.update_successfully'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $locale
     * @param \App\Models\Category $category
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function destroy(string $locale, Promocode $promocode)
    {
        if (!$this->promocodeRepository->delete($promocode->id)) {
            return redirect(locale_route('promocode.show', $promocode->id))->with('danger', __('admin.not_delete_message'));
        }
        return redirect(locale_route('promocode.index'))->with('success', __('admin.delete_message'));
    }
}
