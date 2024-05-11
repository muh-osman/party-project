<?php

use App\Http\Controllers\Api\GuestController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\MailNotifyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {

    // Return the authenticated users and their token
    Route::get('user', function (Request $request) {
        return [
            'user' => $request->user(),
            'currentToken' => $request->bearerToken()
        ];
    });

    // Handles logs out  authenticated user
    Route::post('user/logout', [UserController::class, 'logout']);

    // Handles guests
    Route::apiResource('guests', GuestController::class)->except(['store']);
});

// Create a new guest
Route::post('guests', [GuestController::class, 'store']);
// Handles user login
Route::post('user/login', [UserController::class, 'auth']);
// Handles user registration
Route::post('user/register', [UserController::class, 'store']);

// Send email
Route::post('user/send', [MailNotifyController::class, 'index']);





// Route::apiResource('posts', PostController::class);
