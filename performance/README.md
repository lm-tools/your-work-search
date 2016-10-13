# Performance tests

[Gatling][gatling] is used for performance tests

Project was setup based on [gatling-sbt-plugin-demo][gatling-sbt-plugin-demo]

## Prerequisites
- [Scala build tool][sbt]

## Installation

In order to install [sbt][sbt] the easiest way is to use [sdkman][sdkman]

    $ sdk install sbt
    $ sbt

> If you experience untrusted certificate error do following: 

Edit `~/.sbt/repositories`

    [repositories]
      local
      sbt-releases-repo: http://repo.typesafe.com/typesafe/ivy-releases/, [organization]/[module]/(scala_[scalaVersion]/)(sbt_[sbtVersion]/)[revision]/[type]s/[artifact](-[classifier]).[ext]
      sbt-plugins-repo: http://repo.scala-sbt.org/scalasbt/sbt-plugin-releases/, [organization]/[module]/(scala_[scalaVersion]/)(sbt_[sbtVersion]/)[revision]/[type]s/[artifact](-[classifier]).[ext]
      maven-central: http://repo1.maven.org/maven2/

For more details go [here][sbt-certificate-error]

## Run gatling tests

Start app locally

    $ EXPRESS_BASE_PATH=/your-work-search npm run start

Execute the tests for 100 users that will be ramped up in 60 seconds

    $ USERS=100 RAMP_UP_TIME=60 BASE_URL=http://localhost:3000/your-work-search sbt gatling:test

Report should be generated in `target/gatling` directory

[sbt]: http://www.scala-sbt.org/index.html
[sdkman]: http://sdkman.io/install.html
[sbt-certificate-error]: http://stackoverflow.com/questions/18505176/unresolved-dependency-sbt-0-13-0-after-update#answer-18511228
[gatling]: http://gatling.io/
[gatling-sbt-plugin-demo]: https://github.com/gatling/gatling-sbt-plugin-demo
