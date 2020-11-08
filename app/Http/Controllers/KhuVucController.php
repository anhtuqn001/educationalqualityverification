<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\KhuVuc;
use App\Truong;
use App\User;
use Illuminate\Support\Facades\Hash;


class KhuVucController extends Controller
{
    public function getTruongs($khuvucid){
        try {
        //$truongs = DB::table('truongs')->where('khuvucid',$khuvucid)->get();
         $khuvuc = KhuVuc::findOrFail($khuvucid);
         $truongs = $khuvuc->truongs;
        } catch (Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
         return response()->json([
             'truongs' => $truongs
         ],200);
     }

     public function store(Request $request){
        try { 
        //Tạo user pdg
        $user = new User;
        $user->name = $request->input('tendangnhap');
        $user->password = Hash::make($request->input('password'));
        $user->role = 1;
        $user->save();

        //Tạo huyện
        $khuvuc = new KhuVuc;
        $khuvuc->tenkhuvuc = $request->input('tenkhuvuc');
        $khuvuc->userid = $user->id;
        $khuvuc->save();
        } catch (Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'success' => true
        ],200);
     }

     public function getKhuVuc($khuvucId) {
       try {
        $khuvuc = KhuVuc::findOrFail($khuvucId);
        $khuvuc->truongs;
        } catch (Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'khuvuc' => $khuvuc
        ],200);
     }
}
