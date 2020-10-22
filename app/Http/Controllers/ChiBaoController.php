<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ChiBao;

class ChiBaoController extends Controller
{
    public function update(Request $request) {
       try {
        $chibao = ChiBao::findOrFail($request->input('id'));
        $chibao[$request->input('dataIndex')] = $request->input('value');
        $chibao->save();
    } catch(Exception $e) {
        return response()->json([
            'error'=> $e->getMessage()
        ], 500);
    }
    return response()->json([
        'chibao' => $chibao
    ], 200);
    }
}
