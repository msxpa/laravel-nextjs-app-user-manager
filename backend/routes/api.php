<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\AuthController;

Route::post('/registration', [AuthController::class, 'register']);

//health
Route::get('/health', function() {
    return response()->json([
        'success' => true,
        'status' => 'ok',
        'timestamp' => now(),
    ]);
});

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/profile', [ProfileController::class, 'profile']);
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
