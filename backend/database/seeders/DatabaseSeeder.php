<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $brands = collect([
            ['name' => 'Armaf', 'slug' => 'armaf', 'logo_url' => '/brands/armaf.png'],
            ['name' => 'Afnan', 'slug' => 'afnan', 'logo_url' => '/brands/afnan.png'],
            ['name' => 'Lattafa', 'slug' => 'lattafa', 'logo_url' => '/brands/lattafa.png'],
            ['name' => 'French Avenue', 'slug' => 'french-avenue', 'logo_url' => '/brands/french-avenue.png'],
            ['name' => 'Rasasi', 'slug' => 'rasasi', 'logo_url' => '/brands/rasasi.png'],
            ['name' => 'Mancera', 'slug' => 'mancera', 'logo_url' => '/brands/mancera.png'],
        ])->map(fn ($b) => Brand::create($b));

        $categories = collect([
            ['name' => 'Muški parfemi', 'slug' => 'muski'],
            ['name' => 'Ženski parfemi', 'slug' => 'zenski'],
            ['name' => 'Uniseks', 'slug' => 'uniseks'],
        ])->map(fn ($c) => Category::create($c));

        $products = [
            ['Club de Nuit Intense Man', 'armaf', 'muski', 6900],
            ['Club de Nuit Sillage', 'armaf', 'uniseks', 8200],
            ['Afnan 9 PM', 'afnan', 'muski', 5900],
            ['Afnan Supremacy Not Only Intense', 'afnan', 'muski', 6400],
            ['Khamrah', 'lattafa', 'uniseks', 5500],
            ['Yara', 'lattafa', 'zenski', 4900],
            ['French Avenue Liquid Brun', 'french-avenue', 'uniseks', 7900],
            ['Rasasi Hawas', 'rasasi', 'muski', 8900],
        ];

        foreach ($products as [$name, $brandSlug, $catSlug, $price]) {
            Product::create([
                'brand_id' => $brands->firstWhere('slug', $brandSlug)->id,
                'category_id' => $categories->firstWhere('slug', $catSlug)->id,
                'name' => $name,
                'slug' => \Illuminate\Support\Str::slug($name),
                'description' => "{$name} — luksuzni parfem dostupan u Amber Parfemi ponudi.",
                'price' => $price,
                'in_stock' => true,
            ]);
        }
    }
}
