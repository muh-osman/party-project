<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Guest;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\File;

use App\Mail\MailNotify;
use Mail;

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

        // Generate QR code for the guest
        $qrCode = QrCode::format('png')->size(256)->generate($request->email);

        // Define the directory path
        $directory = public_path('images' . DIRECTORY_SEPARATOR . 'qrcodes');
        // Create the directory if it doesn't exist
        if (!File::isDirectory($directory)) {
            File::makeDirectory($directory, 0755, true, true);
        }

        // Save the QR code image to the directory
        $qrCodePath = $directory . DIRECTORY_SEPARATOR . $request->email . '.png';
        file_put_contents($qrCodePath, $qrCode);

        // Store the guest details and QR code URL in the database
        $guest = Guest::create([
            'name' => $request->name,
            'email' => $request->email,
            'attendanceStatus' => $request->attendanceStatus,
            'qrCodeUrl' => asset('images/qrcodes/' . $request->email . '.png'),
        ]);

        // Send Email by qrcode
        Mail::to($guest->email)->send(new MailNotify($guest->qrCodeUrl));

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
