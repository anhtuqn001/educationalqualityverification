<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Truong;
use App\NienKhoa;
use App\ChiMuc;
use App\User;
use App\Nhom;
use App\KeHoachTDG;
use App\ThoigianHoatdong;
class NienKhoaController extends Controller
{
    public function store(Request $request) {
        try {
            //Tạo niên khóa, chỉ mục và các table liên quan chỉ mục
            // $truong = new Truong;
            // $truong->tentruong = $request->input('tentruong');
            // $truong->huyen = $request->input('huyen');
            // $truong->loaitruong = $request->input('loaitruong');
            // $truong->save();
            $nienkhoa = new NienKhoa;
            $nienkhoa->nam = $request->input('nam');
            $nienkhoa->tennienkhoa = $request->input('tennienkhoa');
            $nienkhoa->truongid = $request->input('truongid');
            $nienkhoa->save();

            $chimucs = $request->input('chimucs');
            if(count($chimucs) > 0) {
                foreach($chimucs as $chimuc) {
                    $newChimuc = new ChiMuc;
                    $newChimuc->tenchimuc = $chimuc['tenchimuc'];
                    $newChimuc->loaichimuc = $chimuc['loaichimuc'];
                    $newChimuc->nienkhoaid = $nienkhoa->id;
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
                        $newChimuc->addChimucChildren($chimuc['children'], $nienkhoa->id);
                    }
                }
            }
            //Tạo kế hoạch
            $kehoach = new KeHoachTDG;
            $kehoach->nienkhoaid = $nienkhoa->id;
            $kehoach->save();

            //Tạo thời gian hoạt động

            for($i = 0; $i < 10; $i++) {
               $thoigianhoatdong = new ThoigianHoatdong;
               $thoigianhoatdong->nienkhoaid = $nienkhoa->id;
               $thoigianhoatdong->save();
            }

           

            //Tạo nhóm HĐTĐG và NTK
            $nhomHDTDG = new Nhom;
            $nhomHDTDG->manhom = "HĐTĐG";
            $nhomHDTDG->tennhom = "Hội Đồng Tự Đánh Giá";
            $nhomHDTDG->loainhom = 1;
            $nhomHDTDG->nienkhoaid = $nienkhoa->id;
            $nhomHDTDG->save();

            $nhomTK = new Nhom;
            $nhomTK->manhom = "NTK";
            $nhomTK->tennhom = "Nhóm Thư Ký";
            $nhomTK->loainhom = 2;
            $nhomTK->nienkhoaid = $nienkhoa->id;
            $nhomTK->save();
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'success' => true
        ], 200);
    }

    public function getNienKhoa(Request $request) {
        try {   
            $nam = $request->input('nam');
            $truong = Truong::findOrFail($request->input('truongid'));
            $nienkhoa = $truong->nienkhoas()->firstWhere('nam', $nam);
        } catch(Exception $e){
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'nienkhoa' => $nienkhoa,
            'success' => true
        ], 200);
    }

    public function getKehoach($nienkhoaId) {
        try {
            $nienkhoa = NienKhoa::findOrFail($nienkhoaId);
            // $truong = Truong::findOrFail($truongId);
            $nienkhoa->truong;
            $nienkhoa->kehoach;
            $nienkhoa->nhomsWithUsers;
            $nienkhoa->tieuchuansWithChibaos;
            $nienkhoa->thoigianhoatdongs;
        } catch(Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
        return response()->json([
            'nienkhoa' => $nienkhoa,
        ]);
    }

    public function getTenTruong($nienkhoaId) {
        try {
            $nienkhoa = NienKhoa::findOrFail($nienkhoaId);
            $tenTruong = $nienkhoa->truong->tentruong;
        } catch(Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
        return response()->json([
            'tentruong' => $tenTruong,
        ]);
    }
}
