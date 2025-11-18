function Get-IPGeolocation {
    param (
        [string]$ip
    )
    
    $geoServiceUrl = @(
        @{
            Name = "ipinfo.io"
            Uri = "http://ipinfo.io/$ip/json"
            CountryField = "country"
            RegionField = "region"
        },
        @{
            Name = "ip-api.com"
            Uri = "http://ip-api.com/json/$ip"
            CountryField = "countryCode"
            RegionField = "regionName"
        },
        @{
            Name = "geojs.io"
            Uri = "https://get.geojs.io/geolocation/ip/$ip.json"
            CountryField = "country_code"
            RegionField = "region"
        },
        @{
            Name = "ipwhois.io"
            Uri = "https://ipwhois.io/api/json/ip/$ip"
            CountryField = "country_code"
            RegionField = "region"
        }
    )
    
    foreach ($service in $geoServiceUrl) {
        try {
            $response = Invoke-RestMethod -Uri $service.Uri -TimeoutSec 3 -ErrorAction Stop
            
            $country = $response.($service.CountryField)
            $region = $response.($service.RegionField)
            
            if ($country -and $country -ne "") {
                return [PSCustomObject]@{
                    Country = $country
                    Region  = if ($region) { $region } else { "Unknown" }
                }
            }
        }
        catch {
        }
    }
    
    return [PSCustomObject]@{
        Country = "Unknown"
        Region  = "Unknown"
    }
}

# Get all established TCP connections, excluding local loopback addresses.
# This makes the query much more efficient.
$connections = Get-NetTCPConnection | Where-Object {
    $_.State -eq "Established" -and
    $_.RemoteAddress -ne "127.0.0.1" -and
    $_.RemoteAddress -ne "0.0.0.0" -and
    $_.RemoteAddress -notlike "::1" -and
    $_.RemoteAddress -notlike "::"
}

# Create a collection to store the final connection details
$connectionDetails = @()

# Process each connection
foreach ($conn in $connections) {
    # Get the process associated with the connection.
    # Use -ErrorAction SilentlyContinue in case the process has already terminated.
    $proc = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
    if ($proc) {
        # Get geolocation info for the remote address
        $geoInfo = Get-IPGeolocation -ip $conn.RemoteAddress

        # Add a custom object with the desired properties to our collection
        $connectionDetails += [PSCustomObject]@{
            localAddress  = $conn.LocalAddress
            localPort     = $conn.LocalPort
            remoteAddress = $conn.RemoteAddress
            remotePort    = $conn.RemotePort
            state         = $conn.State
            processId     = $conn.OwningProcess
            processName   = $proc.Name
            country       = $geoInfo.Country
            region        = $geoInfo.Region
        }
    }
}

# Convert the final collection of objects to a JSON string and write it to the output.
# The Electron app will read this JSON from the standard output stream.
$connectionDetails | ConvertTo-Json