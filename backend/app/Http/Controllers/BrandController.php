<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\JsonResponse;

class BrandController extends Controller
{
    /** List all brands. */
    public function index(): JsonResponse
    {
        return response()->json(
            Brand::orderBy('name')->get()
        );
    }

    /** Show a single brand with its products. */
    public function show(Brand $brand): JsonResponse
    {
        $brand->load(['products.category', 'products.brand']);

        return response()->json($brand);
    }
}
