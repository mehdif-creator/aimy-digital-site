$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$destination = Join-Path $root '.private/wordpress'
New-Item -ItemType Directory -Force $destination | Out-Null
foreach ($type in @('posts','pages','categories','tags','media')) {
  $items = @()
  $page = 1
  do {
    $response = Invoke-WebRequest -Uri "https://aimy-digital.fr/wp-json/wp/v2/${type}?per_page=100&page=$page" -TimeoutSec 45
    $items += @($response.Content | ConvertFrom-Json)
    $total = [int]($response.Headers['X-WP-TotalPages'] | Select-Object -First 1)
    $page++
  } while ($page -le $total)
  ConvertTo-Json -InputObject $items -Depth 40 | Set-Content (Join-Path $destination "$type.json") -Encoding utf8
  Write-Output "$type : $($items.Count) entrées"
}
foreach ($path in @('robots.txt','sitemap_index.xml','wp-sitemap.xml')) {
  try { Invoke-WebRequest -Uri "https://aimy-digital.fr/$path" -OutFile (Join-Path $destination $path) -TimeoutSec 30; Write-Output "$path enregistré" }
  catch { Write-Output "$path : $($_.Exception.Message)" }
}
