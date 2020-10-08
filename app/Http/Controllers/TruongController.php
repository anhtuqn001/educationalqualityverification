<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Truong;
use App\ChiMuc;
use App\User;
use App\Nhom;
use Illuminate\Support\Facades\Hash;

class TruongController extends Controller
{
    public function store(Request $request) {
        try {

            //Tạo trường, chỉ mục và các table liên quan chỉ mục
            $truong = new Truong;
            $truong->tentruong = $request->input('tentruong');
            $truong->huyen = $request->input('huyen');
            $truong->loaitruong = $request->input('loaitruong');
            $truong->save();
            $chimucs = $request->input('chimucs');
            if(count($chimucs) > 0) {
                foreach($chimucs as $chimuc) {
                    $newChimuc = new ChiMuc;
                    $newChimuc->tenchimuc = $chimuc['tenchimuc'];
                    $newChimuc->loaichimuc = $chimuc['loaichimuc'];
                    $newChimuc->truongid = $truong->id;
                    if(array_key_exists("isHideTitle", $chimuc)) {
                        $newChimuc->isHideTitle = $chimuc['isHideTitle'];
                    }
                    if(array_key_exists("isCenterTitle", $chimuc)) {
                        $newChimuc->isCenterTitle = $chimuc['isCenterTitle'];
                    }
                    if(array_key_exists("isDropLine", $chimuc)) {
                        $newChimuc->isDropLine = $chimuc['isDropLine'];
                    }
                    
                    $newChimuc->save();
                    if(array_key_exists("children", $chimuc)){
                        $newChimuc->addChimucChildren($chimuc['children'], $truong->id);
                    }
                }
            }

            // Tạo user Hiệu trưởng
            $user = new User;
            $user->name = $request->input('tendangnhap');
            $user->password = Hash::make($request->input('password'));
            $user->role = 2;
            $user->thuocdonvi()->associate($truong);
            $user->save();

            //Tạo nhóm HĐTĐG và NTK
            $nhomHDTDG = new Nhom;
            $nhomHDTDG->manhom = "HĐTĐG";
            $nhomHDTDG->tennhom = "Hội Đồng Tự Đánh Giá";
            $nhomHDTDG->loainhom = 1;
            $nhomHDTDG->truongid = $truong->id;
            $nhomHDTDG->save();

            $nhomTK = new Nhom;
            $nhomTK->manhom = "NTK";
            $nhomTK->tennhom = "Nhóm Thư Ký";
            $nhomTK->loainhom = 2;
            $nhomTK->truongid = $truong->id;
            $nhomTK->save();
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'result' => true
        ], 200);
    }
}
