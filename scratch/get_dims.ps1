Add-Type -AssemblyName System.Drawing
Get-ChildItem images/character/*.png | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    Write-Host "$($_.Name): $($img.Width) x $($img.Height)"
    $img.Dispose()
}
