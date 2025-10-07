<?php
function checkMySQLVersion() {
    try {
        $pdo = new PDO("mysql:host=localhost", "root", ""); // change credentials if needed
        $stmt = $pdo->query("SELECT VERSION() as v");
        $version = $stmt->fetch(PDO::FETCH_ASSOC)['v'];

        if (stripos($version, 'mariadb') !== false) {
            return [
                "MariaDB >= 10.2",
                version_compare(preg_replace('/[^0-9.]/', '', $version), '10.2.0', '>='),
                $version
            ];
        } else {
            return [
                "MySQL >= 5.7",
                version_compare($version, '5.7.0', '>='),
                $version
            ];
        }
    } catch (Exception $e) {
        return ["MySQL/MariaDB", false, "Not reachable"];
    }
}

$requirements = [
    ["PHP Version >= 8.2", version_compare(PHP_VERSION, '8.2.0', '>='), PHP_VERSION],
    checkMySQLVersion(),
    ["BCMath", extension_loaded('bcmath')],
    ["Ctype", extension_loaded('ctype')],
    ["Fileinfo", extension_loaded('fileinfo')],
    ["JSON", extension_loaded('json')],
    ["Mbstring", extension_loaded('mbstring')],
    ["OpenSSL", extension_loaded('openssl')],
    ["PDO", extension_loaded('pdo')],
    ["PDO MySQL", extension_loaded('pdo_mysql')],
    ["Tokenizer", extension_loaded('tokenizer')],
    ["XML", extension_loaded('xml')],
    ["cURL", extension_loaded('curl')],
    ["GD", extension_loaded('gd')],
    ["GMP", extension_loaded('gmp')],
];

echo "=============================\n";
echo " SERVER REQUIREMENTS CHECK\n";
echo "=============================\n\n";

foreach ($requirements as $req) {
    [$name, $passed, $extra] = $req + [null, null, ""];
    $status = $passed ? "[✔ PASSED]" : "[✘ FAILED]";
    echo str_pad($name, 25) . " : " . $status . ($extra ? " ($extra)" : "") . "\n";
}

echo "\nCheck complete.\n";
