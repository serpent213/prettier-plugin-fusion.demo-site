{
  pkgs,
  lib,
  config,
  inputs,
  ...
}: {
  # https://devenv.sh/packages/
  packages = with pkgs; [
    zstd
  ];

  # https://devenv.sh/languages/
  languages.javascript = {
    enable = true;
    npm = {
      enable = true;
      install.enable = true;
    };
  };

  # https://devenv.sh/scripts/
  scripts.deploy.exec = ''
    scp dist/index.html shell:/var/www/vhosts/zensurradar.de/
    ssh shell "
      gzip -9c /var/www/vhosts/zensurradar.de/index.html > /var/www/vhosts/zensurradar.de/index.html.gz
      brotli -9c /var/www/vhosts/zensurradar.de/index.html > /var/www/vhosts/zensurradar.de/index.html.br
      zstd -19c /var/www/vhosts/zensurradar.de/index.html > /var/www/vhosts/zensurradar.de/index.html.zst
    "
  '';
}
