<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CropResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'categoryName' => $this->category->name,
            'imagePath' => $this->image_path,
            'cropWeeks' => $this->crop_weeks,
            'latestPrice' => [
                'priceMin' => $this->latestPrice->price_min ?? 0,
                'priceMax' => $this->latestPrice->price_max ?? 0,
                'recordedAt' => $this->latestPrice
                    ? $this->latestPrice->recorded_at->diffForHumans()
                    : null,
            ],
        ];
    }
}