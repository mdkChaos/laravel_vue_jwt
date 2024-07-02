<?php

use App\Http\Controllers\FruitController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('users')->controller(UserController::class)->group(function () {
    Route::post('/', 'store');
});

Route::middleware('api')->prefix('auth')->controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/logout', 'logout');
    Route::post('/refresh', 'refresh');
    Route::post('/me', 'me');

    Route::middleware('auth:api')->prefix('fruits')->controller(FruitController::class)->group(function () {
        Route::get('/', 'index');
    });
});
