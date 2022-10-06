<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Size;
use PDO;

class SizeController extends Controller
{
    //

    public function index(Request $request)
    {
        return view("admin.nowa.views.color.index", [
            "data" => Size::paginate(10),
        ]);
    }

    public function addColorsPage(Request $request)
    {
        $product = $request->id;

        return view(
            "admin.nowa.views.color.form",
            [
                'size' => Size::where(['id' => $product])->get(),
            ]
        );
    }

    public function addColor(Request $request)
    {
        // dd($request->post());
        $saveData = $request->except('_token');
        Size::create($saveData);
        return redirect()->route("color.index");
    }

    public function updateSize(Request $request)
    {
        // dd($request->post());
        Size::where("id", $request->id)->update($request->except('_token'));
        return redirect()->route("color.index");
    }

    public function delSize(Request $request, $locale, $id)
    {
        $delSize = Size::where("id", $id)->delete();
        if ($delSize) {
            return redirect()->route("color.index");
        }
    }
}
