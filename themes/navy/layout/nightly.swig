<div class="page-intro wrapper">
  <header class="docs-header">
    <div class="docs-intro">
      <h1>Get the latest web</h1>
      <p>You can download our nightly builds here. Beware of dragons!</p>
      <br/>
    </div>
    <ul>
      <li>
        <div class="inner">
          <h3>Documentation</h3>
          <p>JS API and Extensions</p>
        </div>
        <img src="../img/arrow_blue_shaded.svg" />
        <a href="/docs/"></a>
      </li>
      <li>
        <div class="inner">
          <h3>Build Status</h3>
          <p>For mobile and desktop</p>
        </div>
        <img src="../img/arrow_blue_shaded.svg" />
        <a href="/build_status/"></a>
      </li>
      <li>
        <div class="inner">
          <h3>Research</h3>
          <p>Dive deeper...</p>
        </div>
        <img src="../img/arrow_blue_shaded.svg" />
        <a href="/research/"></a>
      </li>
    </ul>
  </header>
</div>
<div id="content-wrap">
  <div id="content" class="wrapper">
    <div id="content-inner">
      <article class="article-container" itemscope itemtype="http://schema.org/Article">
        <div class="article-inner">
          <div class="nightly-page">
            <div class="inner">
                <div class="article-content" itemprop="articleBody">
                    <div class="nightly-headings">
                        <h1>Status Nightly Builds - Beware the Dragons!</h1>
                        <h3>Updated: {{ date(Date.now(), 'YYYY/MM/DD HH:mm:ss') }} UTC</h3>
                        <p><strong>Warning:</strong> Nightly builds are intended for development testing and may include bugs and other issues.</p>
                        <p>By downloading and installing these builds you assume the full responsibility for all risks concerning your data and funds.
                        Status makes no claims of security or integrity of funds in these builds. Status advises the use of different recovery phrases in nightlies and stable builds.</p>
                        <a href="../build_status/desktop.html" target="_blank">Desktop FAQ</a>
                    </div>
                    <div class="nightly-builds-wrap">
                        <div class="box-desktop">
                            <h2>Linux</h2>
                            <a href="{{ site.data.nightlies['APP'] }}" class="nightly-download" id="app" download>
                                <img src="../nightly/img/linux.png" width="150" />
                                <br><br>
                                <span>{{ site.data.nightlies['APP'] | split('/') | last }}</span>
                            </a>
                        </div>
                        <div class="box-desktop">
                            <h2>macOS</h2>
                            <a href="{{ site.data.nightlies['MAC'] }}" class="nightly-download" id="mac" download>
                                <img src="../nightly/img/macos.png" width="150" />
                                <br><br>
                                <span>{{ site.data.nightlies['MAC'] | split('/') | last }}</span>
                            </a>
                        </div>
                        <div class="clear"></div>
                        <div class="box-desktop">
                            <h2>Windows</h2>
                            <a href="{{ site.data.nightlies['WIN'] }}" class="nightly-download" id="win" download>
                                <img src="../nightly/img/windows.png" width="150" />
                                <br><br>
                                <span>{{ site.data.nightlies['WIN'] | split('/') | last }}</span>
                            </a>
                        </div>
                        <div class="clear"></div>
                        <div class="box-mobile">
                            <h2>Android</h2>
                            <a href="{{ site.data.nightlies['APK'] }}" class="nightly-download" id="apk" download>
                                <img src="../nightly/img/qr-apk.png" width="80%" />
                                <br><br>
                                <span>{{ site.data.nightlies['APK'] | split('/') | last }}</span>
                            </a>
                        </div>
                        <div class="box-mobile">
                            <h2>iOS</h2>
                            <a href="{{ site.data.nightlies['IOS'] }}" class="nightly-download" id="ios" download>
                                <img src="../nightly/img/qr-ios.png" width="80%" />
                                <br><br>
                                <span>{{ site.data.nightlies['IOS'] }}</span>
                            </a>
                            <small>(Requires diawi access)</small>
                        </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</div>
<script defer src="./nightly_downloads_counter.js"></script>
