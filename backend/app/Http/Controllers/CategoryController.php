<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /** List all categories. */
    public function index(): JsonResponse
    {
        return response()->json(
            Category::orderBy('name')->get()
        );
    }

    /** Show a single category with its products. */
    public function show(Category $category): JsonResponse
    {
        $category->load(['products.brand', 'products.category']);

        return response()->json($category);
    }
}
