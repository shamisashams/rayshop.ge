<?php

namespace App\Repositories\Eloquent;


use App\Models\Promocode;
use App\Models\Setting;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\SettingRepositoryInterface;


class PromocodeRepository extends BaseRepository
{

    public function __construct(Promocode $model)
    {
        parent::__construct($model);
    }


}
