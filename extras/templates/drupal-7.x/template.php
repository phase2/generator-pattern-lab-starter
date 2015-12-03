<?php
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
