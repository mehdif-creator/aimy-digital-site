<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function respond(int $code, bool $ok): never { http_response_code($code); echo json_encode(['ok'=>$ok]); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Allow: POST'); respond(405, false); }
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 12000) respond(413, false);
$configPath = getenv('AIMY_CONTACT_CONFIG') ?: '';
$realConfig = realpath($configPath);
$webroot = realpath($_SERVER['DOCUMENT_ROOT'] ?? __DIR__);
if (!$realConfig || !$webroot || !is_file($realConfig) || $realConfig === $webroot || str_starts_with($realConfig, $webroot . DIRECTORY_SEPARATOR)) respond(503, false);
try {
 $config = require $realConfig;
 if (!is_array($config) || empty($config['enabled'])) respond(503, false);
 if (!in_array($_SERVER['HTTP_ORIGIN'] ?? '', $config['origins'] ?? [], true)) respond(403, false);
 foreach (['name','email','company','phone','need','message','website'] as $key) {
  if (isset($_POST[$key]) && !is_string($_POST[$key])) respond(422, false);
 }
 $name=trim($_POST['name'] ?? ''); $email=trim($_POST['email'] ?? ''); $message=trim($_POST['message'] ?? '');
 if (strlen($name)<2 || strlen($name)>200 || !filter_var($email,FILTER_VALIDATE_EMAIL) || strlen($email)>254 || strlen($message)<20 || strlen($message)>10000 || preg_match('/[\r\n]/',$name.$email)) respond(422,false);
 if (!empty($_POST['website'])) respond(422,false);
 $needs=['Créer un site','Refondre un site','Créer une boutique','Améliorer ma visibilité','Maintenance et suivi','Autre projet'];
 if(!in_array($_POST['need'] ?? '',$needs,true)) respond(422,false);
 $statePath=realpath($config['state_dir'] ?? '');
 if(!$statePath || !is_dir($statePath) || !is_writable($statePath) || $statePath === $webroot || str_starts_with($statePath,$webroot.DIRECTORY_SEPARATOR) || strlen($config['rate_secret'] ?? '')<32) respond(503,false);
 $key=hash_hmac('sha256',$_SERVER['REMOTE_ADDR'] ?? 'unknown',$config['rate_secret']);
 $handle=fopen($statePath.'/'. $key.'.json','c+');
 if(!$handle || !flock($handle,LOCK_EX)) respond(503,false);
 $times=json_decode(stream_get_contents($handle),true) ?: [];
 $times=array_values(array_filter($times,fn($t)=>is_int($t)&&$t>time()-3600));
 if(count($times)>=5){flock($handle,LOCK_UN);fclose($handle);header('Retry-After: 3600');respond(429,false);}
 $times[]=time();ftruncate($handle,0);rewind($handle);fwrite($handle,json_encode($times));fflush($handle);flock($handle,LOCK_UN);fclose($handle);
 $data=['name'=>$name,'email'=>$email,'message'=>$message,'need'=>$_POST['need'],'company'=>substr(trim($_POST['company']??''),0,300),'phone'=>substr(trim($_POST['phone']??''),0,60)];
 $send=$config['send'] ?? null;
 if(!is_callable($send) || $send($data)!==true) respond(503,false);
 respond(200,true);
} catch (Throwable $error) { respond(503,false); }
