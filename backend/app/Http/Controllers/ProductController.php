<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * List products, optionally filtered by ?category=slug, ?brand=slug
     * or ?search=term.
     */
    public function index(Request $request): JsonResponse
    {
        $products = Product::query()
            ->with(['brand', 'category'])
            ->when($request->query('category'), function ($query, $slug) {
                $query->whereHas('category', fn ($q) => $q->where('slug', $slug));
            })
            ->when($request->query('brand'), function ($query, $slug) {
                $query->whereHas('brand', fn ($q) => $q->where('slug', $slug));
            })
            ->when($request->query('search'), function ($query, $term) {
                $query->where('name', 'like', "%{$term}%");
            })
            ->orderBy('name')
            ->get();

        return response()->json($products);
    }

    /** Show a single product. */
    public function show(Product $product): JsonResponse
    {
        $product->load(['brand', 'category']);

        return response()->json($product);
    }
}
