<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Truong;
use App\KhuVuc;
use App\ChiMuc;
use App\User;
use App\Nhom;
use App\KeHoachTDG;
use App\ThoigianHoatdong;
use Illuminate\Support\Facades\Hash;

class TruongController extends Controller
{
    public function index() {
        try {
            $truongs = Truong::all();
            $khuvucs = KhuVuc::all();
        } catch (Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'truongs' => $truongs,
            'khuvucs' => $khuvucs
        ], 200);
    }

    public function store(Request $request) {
        try {
            //Tạo trường, chỉ mục và các table liên quan chỉ mục
            $truong = new Truong;
            $truong->tentruong = $request->input('tentruong');
            $truong->huyen = $request->input('huyen');
            $truong->loaitruong = $request->input('loaitruong');
            $truong->khuvucid = $request->input('khuvucid');
            $truong->save();
             // Tạo user Hiệu trưởng
             $user = new User;
             $user->name = $request->input('tendangnhap');
             $user->password = Hash::make($request->input('password'));
             $user->role = 2;
             $user->thuocdonvi()->associate($truong);
             $user->save();
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'success' => true
        ], 200);
    }

}
