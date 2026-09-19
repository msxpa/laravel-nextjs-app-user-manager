<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    //GET api/prifile
    public function profile(Request $request) {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'data'=> [
                'id' => $user->id,
                'email' => $user->email,
                'gender' => $user->gender,
                'created_at' => $user->created_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }
}
