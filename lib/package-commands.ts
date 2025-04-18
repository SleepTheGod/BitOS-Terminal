export const packageCommands = {
  executePackageCommand: (command: string, args: string[]): string => {
    switch (command) {
      case "apt":
      case "apt-get":
        return packageCommands.apt(args)
      case "dpkg":
        return packageCommands.dpkg(args)
      case "apt-cache":
        return packageCommands.aptCache(args)
      default:
        return `${command}: command not found`
    }
  },

  // Simulate apt/apt-get command
  apt: (args: string[]): string => {
    if (args.length === 0) {
      return `apt ${getAptVersion()}
Usage: apt [options] command

apt is a commandline package manager and provides commands for
searching and managing as well as querying information about packages.
It provides the same functionality as the specialized APT tools,
like apt-get and apt-cache, but enables options more suitable for
interactive use by default.

Most used commands:
  list - list packages based on package names
  search - search in package descriptions
  show - show package details
  install - install packages
  reinstall - reinstall packages
  remove - remove packages
  autoremove - Remove automatically all unused packages
  update - update list of available packages
  upgrade - upgrade the system by installing/upgrading packages
  full-upgrade - upgrade the system by removing/installing/upgrading packages
  edit-sources - edit the source information file
  satisfy - satisfy dependency strings

See apt(8) for more information about the available commands.
Configuration options and syntax is detailed in apt.conf(5).
Information about how to configure sources can be found in sources.list(5).
Package and version choices can be expressed via apt_preferences(5).
Security details are available in apt-secure(8).
                                        This APT has Super Cow Powers.`
    }

    const subcommand = args[0]

    if (subcommand === "update") {
      return `Hit:1 http://deb.debian.org/debian bookworm InRelease
Hit:2 http://security.debian.org/debian-security bookworm-security InRelease
Hit:3 http://deb.debian.org/debian bookworm-updates InRelease
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
All packages are up to date.`
    }

    if (subcommand === "upgrade") {
      return `Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Calculating upgrade... Done
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.`
    }

    if (subcommand === "install") {
      if (args.length < 2) {
        return "E: No package name specified"
      }

      const packageName = args[1]

      // Check if sudo is used
      if (!args.includes("--assume-yes") && !args.includes("-y")) {
        return `Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following NEW packages will be installed:
  ${packageName}
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 1,564 kB of archives.
After this operation, 5,192 kB of additional disk space will be used.
Do you want to continue? [Y/n] y
Get:1 http://deb.debian.org/debian bookworm/main amd64 ${packageName} amd64 1.2.3-1 [1,564 kB]
Fetched 1,564 kB in 0s (3,128 kB/s)
Selecting previously unselected package ${packageName}.
(Reading database ... 132517 files and directories currently installed.)
Preparing to unpack .../archives/${packageName}_1.2.3-1_amd64.deb ...
Unpacking ${packageName} (1.2.3-1) ...
Setting up ${packageName} (1.2.3-1) ...
Processing triggers for man-db (2.11.2-2) ...`
      } else {
        return `Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following NEW packages will be installed:
  ${packageName}
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 1,564 kB of archives.
After this operation, 5,192 kB of additional disk space will be used.
Get:1 http://deb.debian.org/debian bookworm/main amd64 ${packageName} amd64 1.2.3-1 [1,564 kB]
Fetched 1,564 kB in 0s (3,128 kB/s)
Selecting previously unselected package ${packageName}.
(Reading database ... 132517 files and directories currently installed.)
Preparing to unpack .../archives/${packageName}_1.2.3-1_amd64.deb ...
Unpacking ${packageName} (1.2.3-1) ...
Setting up ${packageName} (1.2.3-1) ...
Processing triggers for man-db (2.11.2-2) ...`
      }
    }

    if (subcommand === "remove") {
      if (args.length < 2) {
        return "E: No package name specified"
      }

      const packageName = args[1]
      return `Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following packages will be REMOVED:
  ${packageName}
0 upgraded, 0 newly installed, 1 to remove and 0 not upgraded.
After this operation, 5,192 kB disk space will be freed.
Do you want to continue? [Y/n] y
(Reading database ... 132517 files and directories currently installed.)
Removing ${packageName} (1.2.3-1) ...
Processing triggers for man-db (2.11.2-2) ...`
    }

    if (subcommand === "search") {
      if (args.length < 2) {
        return "E: No search term specified"
      }

      const searchTerm = args[1]
      return `Sorting... Done
Full Text Search... Done
${searchTerm}base/stable 1.2.3-1 amd64
  ${searchTerm} base package

lib${searchTerm}/stable 2.3.4-1 amd64
  ${searchTerm} library package

${searchTerm}-utils/stable 3.4.5-1 amd64
  ${searchTerm} utilities package`
    }

    if (subcommand === "show") {
      if (args.length < 2) {
        return "E: No package name specified"
      }

      const packageName = args[1]
      return `Package: ${packageName}
Version: 1.2.3-1
Priority: optional
Section: utils
Maintainer: Debian Developers <debian-devel@lists.debian.org>
Installed-Size: 5192
Depends: libc6 (>= 2.34), libgcc-s1 (>= 3.0)
Homepage: https://www.debian.org/
Download-Size: 1564 kB
APT-Sources: http://deb.debian.org/debian bookworm/main amd64 Packages
Description: ${packageName} package for Debian
 This is a simulated package description for ${packageName}.
 .
 This package provides core functionality for ${packageName}.`
    }

    if (subcommand === "list") {
      return `Listing... Done
bash/stable,now 5.2.15-2+b2 amd64 [installed]
coreutils/stable,now 9.1-1 amd64 [installed]
findutils/stable,now 4.9.0-4 amd64 [installed]
grep/stable,now 3.8-5 amd64 [installed]
gzip/stable,now 1.12-1 amd64 [installed]
sed/stable,now 4.9-1 amd64 [installed]
tar/stable,now 1.34+dfsg-1.2 amd64 [installed]`
    }

    return `E: Invalid operation ${subcommand}`
  },

  // Simulate dpkg command
  dpkg: (args: string[]): string => {
    if (args.length === 0) {
      return `dpkg ${getDpkgVersion()}
Usage: dpkg [options] command

Commands:
  -i|--install       <.deb file>... | -R|--recursive <directory>...
  --unpack           <.deb file>... | -R|--recursive <directory>...
  -A|--record-avail  <.deb file>... | -R|--recursive <directory>...
  --configure        <package>... | -a|--pending
  --triggers-only    <package>... | -a|--pending
  -r|--remove        <package>... | -a|--pending
  -P|--purge         <package>... | -a|--pending
  -V|--verify [<package>...]       Verify the integrity of package(s).
  --get-selections [<pattern>...]  Get list of selections to stdout.
  --set-selections                 Set package selections from stdin.
  --clear-selections               Deselect every non-essential package.
  --update-avail [<Packages-file>] Replace available packages info.
  --merge-avail [<Packages-file>]  Merge with info from file.
  --clear-avail                    Erase existing available info.
  --forget-old-unavail             Forget uninstalled unavailable pkgs.
  -s|--status [<package>...]       Display package status details.
  -p|--print-avail [<package>...]  Display available version details.
  -L|--listfiles <package>...      List files 'owned' by package(s).
  -l|--list [<pattern>...]         List packages concisely.
  -S|--search <pattern>...         Find package(s) owning file(s).
  -C|--audit [<package>...]        Check for broken package(s).
  --yet-to-unpack                  Print packages selected for installation.
  --predep-package                 Print pre-dependencies to unpack.
  --add-architecture <arch>        Add <arch> to the list of architectures.
  --remove-architecture <arch>     Remove <arch> from the list of architectures.
  --print-architecture             Print dpkg architecture.
  --print-foreign-architectures    Print allowed foreign architectures.
  --assert-help                    Display this help message.
  --assert-support-predepends      Display support for Pre-Depends field.
  --assert-working-epoch           Display support for epochs in versions.
  --assert-long-filenames          Display support for long filenames in archives.
  --assert-multi-conrep            Display support for multiple C/R/P in archives.
  --assert-multi-arch              Display support for multiple architectures.
  --assert-versioned-provides      Display support for versioned provides.
  --assert-triggers                Display support for triggers.
  --no-assert-<feature>            Disable assertion of <feature>.
  --compare-versions <a> <op> <b>  Compare version numbers - see below.
  --force-help                     Show help on forcing.
  -Dh|--debug=help                 Show help on debugging.

  -?, --help                       Show this help message.
      --version                    Show the version.

Comparison operators for --compare-versions are:
  lt le eq ne ge gt       (treat empty version as earlier than any version);
  lt-nl le-nl ge-nl gt-nl (treat empty version as later than any version);
  < << <= = >= >> >       (only for compatibility with control file syntax).

Use 'apt' or 'aptitude' for user-friendly package management.`
    }

    const option = args[0]

    if (option === "-l" || option === "--list") {
      return `Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name                Version                 Architecture Description
+++-===================-=======================-============-===============================
ii  bash                5.2.15-2+b2             amd64        GNU Bourne Again SHell
ii  coreutils           9.1-1                   amd64        GNU core utilities
ii  findutils           4.9.0-4                 amd64        utilities for finding files
ii  grep                3.8-5                   amd64        GNU grep, egrep and fgrep
ii  gzip                1.12-1                  amd64        GNU compression utilities
ii  sed                 4.9-1                   amd64        GNU stream editor for filtering/transforming text
ii  tar                 1.34+dfsg-1.2           amd64        GNU version of the tar archiving utility`
    }

    if (option === "-s" || option === "--status") {
      if (args.length < 2) {
        return "dpkg-query: no packages found matching"
      }

      const packageName = args[1]
      return `Package: ${packageName}
Status: install ok installed
Priority: optional
Section: utils
Installed-Size: 5192
Maintainer: Debian Developers <debian-devel@lists.debian.org>
Architecture: amd64
Version: 1.2.3-1
Depends: libc6 (>= 2.34), libgcc-s1 (>= 3.0)
Description: ${packageName} package for Debian
 This is a simulated package description for ${packageName}.
 .
 This package provides core functionality for ${packageName}.`
    }

    if (option === "-L" || option === "--listfiles") {
      if (args.length < 2) {
        return "dpkg-query: no packages found matching"
      }

      const packageName = args[1]
      return `/usr/bin/${packageName}
/usr/share/doc/${packageName}/README.Debian
/usr/share/doc/${packageName}/changelog.Debian.gz
/usr/share/doc/${packageName}/copyright
/usr/share/man/man1/${packageName}.1.gz`
    }

    if (option === "-S" || option === "--search") {
      if (args.length < 2) {
        return "dpkg-query: no path found matching pattern"
      }

      const pattern = args[1]
      if (pattern.includes("bin")) {
        return `bash: /bin/bash
coreutils: /bin/ls
findutils: /usr/bin/find
grep: /bin/grep
sed: /bin/sed`
      }

      return `dpkg-query: no path found matching pattern ${pattern}`
    }

    return `dpkg: error: need an action option

Type dpkg --help for help about installing and deinstalling packages [*];
Use 'apt' or 'aptitude' for user-friendly package management;
Type dpkg -Dhelp for a list of dpkg debug flag values;
Type dpkg --force-help for a list of forcing options;
Type dpkg-deb --help for help about manipulating *.deb files;`
  },

  // Simulate apt-cache command
  aptCache: (args: string[]): string => {
    if (args.length === 0) {
      return `apt-cache ${getAptCacheVersion()}
Usage: apt-cache [options] command
       apt-cache [options] show pkg1 [pkg2 ...]

apt-cache queries and displays available information about installed
and installable packages. It works exclusively on the data acquired
into the local cache via the 'update' command of e.g. apt-get. The
displayed information may therefore be outdated if the last update was
too long ago, but in exchange apt-cache works independently of the
availability of the configured sources (e.g. offline).

Most used commands:
  showsrc - Show source records
  search - Search the package list for a regex pattern
  depends - Show raw dependency information for a package
  rdepends - Show reverse dependency information for a package
  show - Show a readable record for the package
  pkgnames - List the names of all packages in the system
  policy - Show policy settings

See apt-cache(8) for more information about the available commands.
                       This APT has Super Cow Powers.`
    }

    const subcommand = args[0]

    if (subcommand === "search") {
      if (args.length < 2) {
        return "E: No search term specified"
      }

      const searchTerm = args[1]
      return `${searchTerm}base - ${searchTerm} base package
  ${searchTerm}base is the core package for ${searchTerm}

lib${searchTerm} - ${searchTerm} library package
  This package provides the shared libraries for ${searchTerm}

${searchTerm}-utils - ${searchTerm} utilities package
  This package contains utilities for working with ${searchTerm}

python3-${searchTerm} - Python 3 bindings for ${searchTerm}
  This package provides Python 3 bindings for ${searchTerm}

${searchTerm}-dev - Development files for ${searchTerm}
  This package contains the header files and static libraries for ${searchTerm}

${searchTerm}-doc - Documentation for ${searchTerm}
  This package contains the documentation for ${searchTerm}`
    }

    if (subcommand === "show") {
      if (args.length < 2) {
        return "E: No package name specified"
      }

      const packageName = args[1]
      return `Package: ${packageName}
Version: 1.2.3-1
Priority: optional
Section: utils
Maintainer: Debian Developers <debian-devel@lists.debian.org>
Installed-Size: 5192
Depends: libc6 (>= 2.34), libgcc-s1 (>= 3.0)
Homepage: https://www.debian.org/
Download-Size: 1564 kB
APT-Sources: http://deb.debian.org/debian bookworm/main amd64 Packages
Description: ${packageName} package for Debian
 This is a simulated package description for ${packageName}.
 .
 This package provides core functionality for ${packageName}.`
    }

    if (subcommand === "depends") {
      if (args.length < 2) {
        return "E: No package name specified"
      }

      const packageName = args[1]
      return `${packageName}
  Depends: libc6 (>= 2.34)
  Depends: libgcc-s1 (>= 3.0)
  Recommends: ${packageName}-common
  Suggests: ${packageName}-doc`
    }

    if (subcommand === "rdepends") {
      if (args.length < 2) {
        return "E: No package name specified"
      }

      const packageName = args[1]
      return `${packageName}
Reverse Depends:
  ${packageName}-utils
  ${packageName}-dev
  lib${packageName}-dev`
    }

    if (subcommand === "policy") {
      if (args.length < 2) {
        return `Package files:
 100 /var/lib/dpkg/status
     release a=now
 500 http://deb.debian.org/debian bookworm/main amd64 Packages
     release v=12.0,o=Debian,a=stable,n=bookworm,l=Debian,c=main,b=amd64
 500 http://security.debian.org/debian-security bookworm-security/main amd64 Packages
     release v=12,o=Debian,a=stable-security,n=bookworm-security,l=Debian-Security,c=main,b=amd64
 500 http://deb.debian.org/debian bookworm-updates/main amd64 Packages
     release o=Debian,a=stable-updates,n=bookworm-updates,l=Debian,c=main,b=amd64

Package pin: (not found)`
      }

      const packageName = args[1]
      return `Package: ${packageName}
Pin: release a=stable
Pin-Priority: 500

Package: ${packageName}
Pin: release a=stable-security
Pin-Priority: 500

Package: ${packageName}
Pin: release a=stable-updates
Pin-Priority: 500`
    }

    return `E: Invalid operation ${subcommand}`
  },
}

// Helper functions
function getAptVersion(): string {
  return "2.6.1 (amd64)"
}

function getDpkgVersion(): string {
  return "1.21.22 (amd64)"
}

function getAptCacheVersion(): string {
  return "2.6.1 (amd64)"
}
