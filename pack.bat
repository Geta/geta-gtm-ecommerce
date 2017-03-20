@echo off
set outputDir=%~dp0

if not "%1"=="" (
  set outputDir=%1
)


nuget pack Geta.GTM.Ecommerce\Geta.GTM.Ecommerce.csproj -IncludeReferencedProjects

@echo on