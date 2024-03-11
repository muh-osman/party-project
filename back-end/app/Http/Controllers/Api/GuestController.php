<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Guest;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

class GuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $guests = Guest::all();
        $totalGuests = $guests->count();
        $attendingGuests = $guests->where('attendanceStatus', true)->count();
        $notAttendingGuests = $guests->where('attendanceStatus', false)->count();


        return response()->json([
            'status' => 'success',
            'totalGuests' => $totalGuests,
            'attending' => $attendingGuests,
            'notAttending' => $notAttendingGuests,
            'guests' => $guests,
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

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'attendanceStatus' => 'required|boolean',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $guest = Guest::create([
            'name' => $request->name,
            'email' => $request->email,
            'attendanceStatus' => $request->attendanceStatus,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => "Guest created successfully",
            'guest' => $guest
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Guest $guest)
    {
        $guest = Guest::findOrFail($guest->id);

        return response()->json([
            'status' => 'success',
            'guest' => $guest
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Guest $guest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Guest $guest)
    // method post
    // http://127.0.0.1:8000/api/guests/1?_method=PATCH

    {
        $guest = Guest::findOrFail($guest->id);

        $guest->update([
            'attendanceStatus' => $request->attendanceStatus,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => "Guest status updated successfully",
            'guest' => $guest
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guest $guest)
    {
        $guest = Guest::findOrFail($guest->id);

        $guest->delete();

        return response()->json([
            'status' => 'success',
            'message' => "Guest deleted successfully",
        ]);
    }
}
