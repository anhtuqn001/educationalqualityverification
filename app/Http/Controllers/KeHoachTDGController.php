<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\KeHoachTDG;
use App\ChiMuc;
use App\ThoigianHoatdong;

class KeHoachTDGController extends Controller
{
    public function update(Request $request) {
        try {
            switch($request->input('type')) {
                case 1:
                $target = KeHoachTDG::findOrFail($request->input('id'));
                $target[$request->input('index')] = $request->input('value');
                $target->save();
                break;
                case 2: 
                case 3:
                $target = ChiMuc::findOrFail($request->input('id'));
                $target[$request->input('index')] = $request->input('value');
                $target->save();
                break;
                case 4:
                $target = ThoigianHoatdong::findOrFail($request->input('id'));
                $target[$request->input('index')] = $request->input('value');
                $target->save();
                break;
            }
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'success' => true,
            'target' => $target
        ]);
    }
}
