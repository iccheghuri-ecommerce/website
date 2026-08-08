<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with(['booking.tour', 'booking.user'])->latest()->paginate(15);

        return Inertia::render('Admin/Payments/Index', [
            'payments' => $payments,
        ]);
    }

    public function update(Request $request, Payment $payment)
    {
        $data = $request->validate([
            'status' => 'required|in:pending,verified,rejected',
        ]);

        $payment->update($data);

        if ($data['status'] === 'verified') {
            $booking = $payment->booking;
            $booking->increment('paid_amount', $payment->amount);
        }

        return redirect()->route('admin.payments.index')->with('success', 'Payment status updated.');
    }
}
