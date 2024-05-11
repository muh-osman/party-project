<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>QR Code Email</title>
</head>

<body>
    <h2>QR Code for you</h2>
    <p>Save the QR code below to use it at event:</p>
    {{-- not woking in local host --}}
    <img src="{{ $qrCodeUrl }}" alt="QR Code Image">
</body>

</html>
