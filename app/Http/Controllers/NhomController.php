<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Nhom;
use App\Truong;
use App\NienKhoa;

class NhomController extends Controller
{
    public function index(Request $request, $nienkhoaId) {
       $nienkhoa = NienKhoa::findOrFail($nienkhoaId);
       $nhoms = $nienkhoa->nhoms()->with('users')->get();
       return response()->json(['nhoms' => $nhoms], 200);
    }

    public function store(Request $request) {
        try {
        $nhom = new Nhom;
        $nhom->manhom = $request->input('manhom');
        $nhom->tennhom = $request->input('tennhom');
        $nhom->ghichu = $request->input('ghichu');
        $nhom->nienkhoaid = $request->input('nienkhoaid');
        $nhom->save();
        $nhom->users;
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json(['nhom' => $nhom], 200);
    }

    public function update(Request $request) {
        try {
            $nhom = Nhom::findOrFail($request->input('id'));
            $nhom->manhom = $request->input('manhom');
            $nhom->tennhom = $request->input('tennhom');
            $nhom->ghichu = $request->input('ghichu');
            $nhom->save();
            $nhom->users;
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json(['nhom' => $nhom], 200);
    }

    public function destroy(Request $request, $id) {
        try {
          $nhom = Nhom::findOrFail($id);
          $nhom->delete();
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([], 200);
    }

    public function getNhomsWithUserMinhChungs($nienkhoaId) {
        try {
            $nienkhoa = NienKhoa::findOrFail($nienkhoaId);
            $nhoms = $nienkhoa->nhoms()->with(['users.minhchungs.tieuchi'])->get();
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
       return response()->json(['nhoms' => $nhoms], 200);        
    }
}
