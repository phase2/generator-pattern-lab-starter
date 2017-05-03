<?php

/**
  * Implements hook_css_alter().
  */
function <%= themeName %>_css_alter(&$css) {
  // Remove Drupal core css
  // $exclude = array(
  //   'modules/aggregator/aggregator.css' => FALSE,
  //   'modules/block/block.css' => FALSE,
  //   'modules/book/book.css' => FALSE,
  //   'modules/comment/comment.css' => FALSE,
  //   'modules/dblog/dblog.css' => FALSE,
  //   'modules/field/theme/field.css' => FALSE,
  //   'modules/file/file.css' => FALSE,
  //   'modules/filter/filter.css' => FALSE,
  //   'modules/forum/forum.css' => FALSE,
  //   'modules/help/help.css' => FALSE,
  //   'modules/menu/menu.css' => FALSE,
  //   'modules/node/node.css' => FALSE,
  //   'modules/openid/openid.css' => FALSE,
  //   'modules/poll/poll.css' => FALSE,
  //   'modules/profile/profile.css' => FALSE,
  //   'modules/search/search.css' => FALSE,
  //   'modules/statistics/statistics.css' => FALSE,
  //   'modules/syslog/syslog.css' => FALSE,
  //   'modules/system/admin.css' => FALSE,
  //   'modules/system/maintenance.css' => FALSE,
  //   'modules/system/system.css' => FALSE,
  //   'modules/system/system.admin.css' => FALSE,
  //   'modules/system/system.base.css' => FALSE,
  //   'modules/system/system.maintenance.css' => FALSE,
  //   'modules/system/system.messages.css' => FALSE,
  //   'modules/system/system.menus.css' => FALSE,
  //   'modules/system/system.theme.css' => FALSE,
  //   'modules/taxonomy/taxonomy.css' => FALSE,
  //   'modules/tracker/tracker.css' => FALSE,
  //   'modules/update/update.css' => FALSE,
  //   'modules/user/user.css' => FALSE,
  //   'misc/vertical-tabs.css' => FALSE,
  //   // Remove contrib module CSS
  //   drupal_get_path('module', 'views') . '/css/views.css' => FALSE,
  // );
  // $css = array_diff_key($css, $exclude);
}

/**
* @file
* Contains functions to alter Drupal's markup for the <%= themeName %> theme.
*
* The <%= themeName %> theme borrows greatly from the Aurora theme.
* See the project page for more information:
*   http://drupal.org/project/aurora
*/

/**
 * Implements hook_preprocess_node().
 *
 * Backports the following changes made to Drupal 8:
 * - #1077602: Convert node.tpl.php to HTML5.
 */
function <%= themeName %>_preprocess_node(&$vars) {
  // Add article ARIA role.
  $vars['attributes_array']['role'] = 'article';

  // Add the type & display mode as a class to nodes
  // so theme can change on these displays.
  $type = drupal_html_class($vars['type']);
  $vars['classes_array'][] = $type;

  $view_mode = drupal_html_class($vars['view_mode']);
  $vars['classes_array'][] = 'node-' . $view_mode;

  // Also add with $type.
  $vars['classes_array'][] = $type . '--' . $view_mode;

  // Global view mode modifications.
  switch ($vars['view_mode']) {

  }

  // Provide node type preprocess functions.
  $type_function = '<%= themeName %>_preprocess_node__' . $vars['type'];
  if (function_exists($type_function)) {
    $type_function($vars);
  }

  // Provide node display preprocess functions.
  $display_function = '<%= themeName %>_preprocess_node__' . $vars['view_mode'];
  if (function_exists($display_function)) {
    $display_function($vars);
  }
}
