<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MinhChungFile;
class MinhChungFileController extends Controller
{
    public function store(Request $request) {
        try {
            $minhchungfile = new MinhChungFile;
            $minhchungfile->ten = $request->input('ten'); 

            if($request->hasFile('file')) {
                $fileName = $request->file('file')->getClientOriginalName();
                // lowercasing extension 
                $splitedFileName = explode(".", $fileName);
                $lastIndex = count($splitedFileName) - 1;
                $splitedFileName[$lastIndex] = strtolower($splitedFileName[$lastIndex]);
                $fileName = implode(".", $splitedFileName);
                // end lowercasing
                $uniqueFileName = time(). "-" . $fileName;
                $request->file('file')->move('files/', $uniqueFileName);
                $minhchungfile->tenluutru = $uniqueFileName;
            }
            $minhchungfile->minhchungid = $request->input('minhchungid');
            $minhchungfile->save();
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'minhchungfile' => $minhchungfile
        ], 200);
    }

    public function remove(Request $request) {
       try {
        $minhchungFile = MinhChungFile::findOrFail($request->input('id'));
        $tenluutru = $minhchungFile->tenluutru;
        unlink(public_path('files/' . $tenluutru));
        $minhchungFile->delete();
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
