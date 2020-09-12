<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    'middleware' => ['jwtverify']
], function ($router) {
    // Route::get('doituong', 'DoiTuongController@index');
    Route::get('user', 'AuthController@getAuthenticatedUser');
    Route::post('logout', 'AuthController@doLogout');
    // Route::post('changepassword', 'AuthController@changePassword');
    Route::get('nhom/{idTruong}', 'NhomController@index');
    Route::post('nhom', 'NhomController@store');
    Route::put('nhom', 'NhomController@update');
    Route::delete('nhom/{id}', 'NhomController@destroy');

    //user 
    Route::post('user', 'UserController@createUserFromNhom');
    Route::put('user', 'UserController@update');
    Route::delete('user/{id}', 'UserController@destroy');

    //chimuc
    Route::get('chimuc', 'ChiMucController@index');
    Route::get('getchimucfromuser/{userId}', 'ChiMucController@getChiMucFromUser');
    Route::post('applychimuc', 'ChiMucController@applyChiMucsToUser');
    Route::post('removechimuc', 'ChiMucController@removeChiMucsFromUser');

    Route::get('chimuctest', 'ChiMucController@chimucTest');
    Route::get('getchimuctable/{id}', 'ChiMucController@getChimucTableTypeFromUser');
    Route::put('updatechimuctabledetails', 'ChiMucController@updateChimucTableDetails');
    Route::put('updatechimuccontent', 'ChiMucController@updateChimucContent');

});

Route::post('login', 'AuthController@doLogin');

Route::get('/exportqdtlhdtdg', 'WordExportController@createQDTLHDTGDDocx');