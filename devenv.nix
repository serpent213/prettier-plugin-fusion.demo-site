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
    scp dist/index.html dist/index.astro_astro_type_script_index_0_lang.js shell:htdocs/fusionfmt/
    ssh shell "
      gzip -9c htdocs/fusionfmt/index.html > htdocs/fusionfmt/index.html.gz
      gzip -9c htdocs/fusionfmt/index.astro_astro_type_script_index_0_lang.js > htdocs/fusionfmt/index.astro_astro_type_script_index_0_lang.js.gz
      brotli -9c htdocs/fusionfmt/index.html > htdocs/fusionfmt/index.html.br
      brotli -9c htdocs/fusionfmt/index.astro_astro_type_script_index_0_lang.js > htdocs/fusionfmt/index.astro_astro_type_script_index_0_lang.js.br
      zstd -9c htdocs/fusionfmt/index.html > htdocs/fusionfmt/index.html.zst
      zstd -19c htdocs/fusionfmt/index.astro_astro_type_script_index_0_lang.js > htdocs/fusionfmt/index.astro_astro_type_script_index_0_lang.js.zst
    "
  '';
}
