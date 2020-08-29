<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Nhom;
use App\User;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    public function createUserFromNhom(Request $request) {
        try {
        $nhom = Nhom::findOrFail($request->input('nhomid'));
        $user = new User();
        $user->email = $request->input('email');
        $user->name = $request->input('tendangnhap');
        $user->password = Hash::make($request->input('password'));
        $user->hoten = $request->input('hoten');
        $user->chucvu = $request->input('chucvu');
        $user->nhiemvu = $request->input('nhiemvu');
        $user->isMale = $request->input('isMale') == "true";
        $user->isTruongnhom = $request->input('isTruongnhom') == "true";
        $user->isTimkiemminhchung = $request->input('isTimkiemminhchung') == "true";
        $user->thuocdonvi()->associate($nhom);
        $user->save();
        } catch(Exception $e){
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }   
        return response()->json([
            'user' => $user
        ], 200);
    }

    public function update(Request $request) {
        try {
            $user = User::findOrFail($request->input('id'));
            $user->email = $request->input('email');
            $user->name = $request->input('tendangnhap');
            if($request->input('password') != null){
            $user->password = Hash::make($request->input('password'));
            }
            $user->hoten = $request->input('hoten');
            $user->chucvu = $request->input('chucvu');
            $user->nhiemvu = $request->input('nhiemvu');
            $user->isMale = $request->input('isMale') == "true";
            $user->isTruongnhom = $request->input('isTruongnhom') == "true";
            $user->isTimkiemminhchung = $request->input('isTimkiemminhchung') == "true";
            $user->save();
            } catch(Exception $e){
                return response()->json([
                    'error'=> $e->getMessage()
                ], 500);
            }   
            return response()->json([
                'user' => $user
            ], 200);
    }

    public function destroy(Request $request, $id) {
        try {
          $user = User::findOrFail($id);
          $user->delete();
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([], 200);
    }
}
