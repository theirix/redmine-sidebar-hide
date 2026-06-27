# encoding: utf-8
require File.expand_path('../lib/sidebar_hook_listener', __FILE__)

Redmine::Plugin.register :sidebar_hide do
  name 'Sidebar Hide Plugin'
  author 'Berk Demirkır, Evgenii Seliverstov'
  description 'This plugin provides ability to hide sidebar'
  version '0.0.10'
  url 'https://github.com/bdemirkir/sidebar_hide'
  author_url 'https://github.com/bdemirkir'
end
