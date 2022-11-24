DEFAULT_APPS = [
    "admin_interface",
    "colorfield",
    "extra_settings",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.humanize",
    "django.contrib.sitemaps",
    "django.contrib.sites",
    "django_cleanup.apps.CleanupConfig",
    "import_export",
    "rest_framework",
    "django_filters",
    "drf_yasg",
    "dj_rest_auth",
    "corsheaders",
    "easy_select2",
    "service_objects",
    "ckeditor",
    "ckeditor_uploader",
    "adminsortable2",
]

PROJECT_APPS = [
    "apps.core.utils",
    "apps.core.main",
    "apps.core.api",
    "apps.api.auth",
]

DEVELOPER_APPS = [
    *DEFAULT_APPS,
    "django_extensions",
    *PROJECT_APPS,
    "silk",
    "debug_toolbar",
]

PRODUCTION_APPS = [
    *DEFAULT_APPS,
    *PROJECT_APPS,
]
