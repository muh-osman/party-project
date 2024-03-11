<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::all();
        return response()->json([
            'status' => 'success',
            'posts' => $posts
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->has('image')) {
            $imageName = time() . '.' . $request->image->extension();
            Storage::disk('public')->put($imageName, file_get_contents($request->image));

            $post = Post::create([
                'title' => $request->title,
                'content' => $request->content,
                'image' => $imageName
            ]);

            return response()->json([
                'status' => 'success',
                'message' => "Post creates successfuly",
                'post' => $post
            ], 201);
        } else {
            $post = Post::create([
                'title' => $request->title,
                'content' => $request->content,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => "Post created successfully",
                'post' => $post
            ], 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post = Post::findOrFail($post->id);

        return response()->json([
            'status' => 'success',
            'post' => $post
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $post = Post::findOrFail($post->id);

        if ($request->has('image')) {
            $imageName = time() . '.' . $request->image->extension();
            Storage::disk('public')->put($imageName, file_get_contents($request->image));

            $post->update([
                'title' => $request->title,
                'content' => $request->content,
                'image' => $imageName
            ]);

            return response()->json([
                'status' => 'success',
                'message' => "Post updated successfuly",
                'post' => $post
            ], 201);
        } else {
            $post->update([
                'title' => $request->title,
                'content' => $request->content,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => "Post updated successfully",
                'post' => $post
            ], 201);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post = Post::findOrFail($post->id);

        $post->delete();

        return response()->json([
            'status' => 'success',
            'message' => "Post deleted successfully",
        ]);
    }
}
