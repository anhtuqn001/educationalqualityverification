<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class VerifyJWTToken extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    // public function handle($request, Closure $next)
    // {
        
    //     return $next($request);
    // }
    public function handle($request, Closure $next)
        {
            try {
                $user = JWTAuth::parseToken()->authenticate();
            } catch (Exception $e) {
                if ($e instanceof \Tymon\JWTAuth\Excepstions\TokenInvalidException){
                    return response()->json(['error' => 'Token is Invalid'], 401);
                }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                    return response()->json(['error' => 'Token is Expired'], 401);
                }else {
                    return response()->json(['error' => 'Authorization Token not found'], 401);
                }
            }
            return $next($request);
        }
}
