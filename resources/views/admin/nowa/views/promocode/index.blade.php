@extends('admin.nowa.views.layouts.app')

@section('styles')



@endsection

@section('content')



    <!-- breadcrumb -->
    <div class="breadcrumb-header justify-content-between">
        <div class="left-content">
            <span class="main-content-title mg-b-0 mg-b-lg-1">@lang('admin.promocode')</span>
        </div>
        <div class="justify-content-center mt-2">
            @include('admin.nowa.views.layouts.components.breadcrump')
        </div>
    </div>
    <!-- /breadcrumb -->

    <!-- row opened -->
    <div class="row row-sm">
        <div class="col-xl-12">
            <div class="card">
                <div class="card-header pb-0">
                    <div class="d-flex justify-content-between">
                        <h4 class="card-title mg-b-0">@lang('admin.promocodes')</h4>
                    </div>
                    <a href="{{locale_route('promocode.create')}}" class="btn ripple btn-primary" type="button">@lang('admin.create')</a>

                    {{--<p class="tx-12 tx-gray-500 mb-2">Example of Nowa Simple Table. <a href="">Learn more</a></p>--}}
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <form class="mr-0 p-0">
                            <table class="table mg-b-0 text-md-nowrap">
                                <thead>
                                <tr>
                                    <th>@lang('admin.id')</th>
                                    <th>@lang('admin.status')</th>
                                    <th>@lang('admin.discount')</th>
                                    <th>@lang('admin.promocode')</th>
                                    <th>@lang('admin.actions')</th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr>
                                    <th>
                                        <input class="form-control" type="number" name="id" onchange="this.form.submit()"
                                               value="{{Request::get('id')}}"
                                               class="validate {{$errors->has('id') ? '' : 'valid'}}">
                                    </th>
                                    <th>
                                        <select class="form-control" name="status" onchange="this.form.submit()">
                                            <option value="" {{Request::get('status') === '' ? 'selected' :''}}>@lang('admin.any')</option>
                                            <option value="1" {{Request::get('status') === '1' ? 'selected' :''}}>@lang('admin.active')</option>
                                            <option value="0" {{Request::get('status') === '0' ? 'selected' :''}}>@lang('admin.not_active')</option>
                                        </select>
                                    </th>
                                    <th>
                                        <input class="form-control" type="text" name="reward" onchange="this.form.submit()"
                                               value="{{Request::get('reward')}}"
                                               class="validate {{$errors->has('reward') ? '' : 'valid'}}">
                                    </th>
                                    <th>

                                    </th>


                                @if($data)
                                    @foreach($data as $slider)
                                        <tr>
                                            <td>{{$slider->id}}</td>
                                            <td>

                                                <span {!! $slider->status == 'active'?'style="color:green"':'style="color:red"' !!}>{{$slider->status}}</span>

                                            </td>
                                            <td>{{$slider->discount}}</td>
                                            <td>{{$slider->promocode}}</td>

                                            <td>

                                                <a href="{{locale_route('promocode.edit',$slider->id)}}"
                                                   class="pl-3">
                                                    <i class="fa fa-edit">??????????????????</i>
                                                </a>
                                                <a href="{{locale_route('promocode.destroy',$slider->id)}}"
                                                   onclick="return confirm('Are you sure?')" class="pl-3">
                                                    <i class="fa fa-edit">???????????????</i>
                                                </a>
                                            </td>
                                        </tr>
                                    @endforeach
                                @endif


                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!--/div-->

        {{ $data->appends(request()->input())->links('admin.vendor.pagination.material') }}
    </div>
    <!-- /row -->

@endsection

@section('scripts')



@endsection
