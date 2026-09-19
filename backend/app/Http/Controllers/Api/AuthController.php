<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;


class AuthController extends Controller
{
    //POST api/registration
    public function register(Request $request) 
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
            'password'=> [
                'required',
                'string',
                'min:8',
                Password::min(8)->letters()->mixedCase()->numbers()->symbols(),
            ],
            'gender' => 'required|in:male,female,other',
        ]);

        $user = User::create([
            'name' => explode('@', $validated['email'])[0],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'gender' => $validated['gender'],
        ]);

        // $token = $user->createToken('auth_token')->accessToken;
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'User created',
            'data' => [
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer',
            ],
        ], 201);
    }
}
