<?php

use App\Http\Controllers\FruitController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('users')->controller(UserController::class)->group(function () {
    // Route::get('/', 'index');
    Route::post('/', 'store');
    // Route::get('/{person}', 'show');
    // Route::patch('/{person}', 'update');
    // Route::delete('/{person}', 'delete');
});
Route::prefix('fruits')->controller(FruitController::class)->group(function () {
    Route::get('/', 'index');
    //Route::post('/', 'store');
    // Route::get('/{person}', 'show');
    // Route::patch('/{person}', 'update');
    // Route::delete('/{person}', 'delete');
});
