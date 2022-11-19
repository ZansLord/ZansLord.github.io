import axios from 'axios';
import React, { Fragment, useCallback, useEffect, useState, useRef } from 'react';

import BIRDS from 'vanta/dist/vanta.birds.min';
import CELLS from 'vanta/dist/vanta.cells.min'
import CLOUDS from 'vanta/dist/vanta.clouds.min'
import CLOUDS2 from 'vanta/dist/vanta.clouds2.min'
import DOTS from 'vanta/dist/vanta.dots.min'
//import FOGS from 'vanta/dist/vanta.fogs.min'
import GLOBE from 'vanta/dist/vanta.globe.min'
import HALO from 'vanta/dist/vanta.halo.min'
import NET from 'vanta/dist/vanta.net.min'
import RINGS from 'vanta/dist/vanta.rings.min'
import RIPPLE from 'vanta/dist/vanta.ripple.min'
import TOPOLOGY from 'vanta/dist/vanta.topology.min'
import TRUNK from 'vanta/dist/vanta.trunk.min'
import WAVES from 'vanta/dist/vanta.waves.min'

import HeadTagEditor from './head-tag-editor';
import ErrorPage from './error-page';
import ThemeChanger from './theme-changer';
import AvatarCard from './avatar-card';
import Details from './details';
import Skill from './skill';
import Experience from './experience';
import Education from './education';
import Project from './project';
import Blog from './blog';
import {
  genericError,
  getInitialTheme,
  noConfigError,
  notFoundError,
  setupHotjar,
  tooManyRequestError,
  sanitizeConfig,
  skeleton,
} from '../helpers/utils';
import { HelmetProvider } from 'react-helmet-async';
import PropTypes from 'prop-types';
import '../assets/index.css';
import { formatDistance } from 'date-fns';

const bgColor = 'bg-base-300';

const GitProfile = ({ config }) => {








  const [vantaEffect, setVantaEffect] = useState(null)
  const myRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(WAVES({
        el: myRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        zoom:.3
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])











  const [error, setError] = useState(
    typeof config === 'undefined' && !config ? noConfigError : null
  );
  const [sanitizedConfig] = useState(
    typeof config === 'undefined' && !config ? null : sanitizeConfig(config)
  );
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    if (sanitizedConfig) {
      setTheme(getInitialTheme(sanitizedConfig.themeConfig));
      setupHotjar(sanitizedConfig.hotjar);
      loadData();
    }
  }, [sanitizedConfig]);

  useEffect(() => {
    theme && document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const loadData = useCallback(() => {
    axios
      .get(`https://api.github.com/users/${sanitizedConfig.github.username}`)
      .then((response) => {
        let data = response.data;

        let profileData = {
          avatar: data.avatar_url,
          name: data.name ? data.name : '',
          bio: data.bio ? data.bio : '',
          location: data.location ? data.location : '',
          company: data.company ? data.company : '',
        };

        setProfile(profileData);
        return data;
      })
      .then((userData) => {
        let excludeRepo = ``;
        if (userData.public_repos === 0) {
          setRepo([]);
          return;
        }

        sanitizedConfig.github.exclude.projects.forEach((project) => {
          excludeRepo += `+-repo:${sanitizedConfig.github.username}/${project}`;
        });

        let query = `user:${
          sanitizedConfig.github.username
        }+fork:${!sanitizedConfig.github.exclude.forks}${excludeRepo}`;

        let url = `https://api.github.com/search/repositories?q=${query}&sort=${sanitizedConfig.github.sortBy}&per_page=${sanitizedConfig.github.limit}&type=Repositories`;

        axios
          .get(url, {
            headers: {
              'Content-Type': 'application/vnd.github.v3+json',
            },
          })
          .then((response) => {
            let data = response.data;

            setRepo(data.items);
          })
          .catch((error) => {
            handleError(error);
          });
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setLoading]);

  const handleError = (error) => {
    console.error('Error:', error);
    try {
      let reset = formatDistance(
        new Date(error.response.headers['x-ratelimit-reset'] * 1000),
        new Date(),
        {
          addSuffix: true,
        }
      );

      if (error.response.status === 403) {
        setError(tooManyRequestError(reset));
      } else if (error.response.status === 404) {
        setError(notFoundError);
      } else {
        setError(genericError);
      }
    } catch (error2) {
      setError(genericError);
    }
  };

  return (
    <HelmetProvider>
      {sanitizedConfig && (
        <HeadTagEditor
          profile={profile}
          theme={theme}
          googleAnalytics={sanitizedConfig.googleAnalytics}
          social={sanitizedConfig.social}
        />
      )}
      <div className="fade-in h-screen">
        {error ? (
          <ErrorPage
            status={`${error.status}`}
            title={error.title}
            subTitle={error.subTitle}
          />
        ) : (
          sanitizedConfig && (
            <Fragment>
              <div className={`p-4 lg:p-10 min-h-full ${bgColor}`}   ref={myRef}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-box">
                  <div className="col-span-1">
                    <div className="grid grid-cols-1 gap-6">
                      {!sanitizedConfig.themeConfig.disableSwitch && (
                        <ThemeChanger
                          theme={theme}
                          setTheme={setTheme}
                          loading={loading}
                          themeConfig={sanitizedConfig.themeConfig}
                        />
                      )}
                      <AvatarCard
                        profile={profile}
                        loading={loading}
                        avatarRing={!sanitizedConfig.themeConfig.hideAvatarRing}
                        resume={sanitizedConfig.resume}
                      />
                      <Details
                        profile={profile}
                        loading={loading}
                        github={sanitizedConfig.github}
                        social={sanitizedConfig.social}
                      />
                      <Skill
                        loading={loading}
                        skills={sanitizedConfig.skills}
                      />
                      <Experience
                        loading={loading}
                        experiences={sanitizedConfig.experiences}
                      />
                      <Education
                        loading={loading}
                        education={sanitizedConfig.education}
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-2 col-span-1">
                    <div className="grid grid-cols-1 gap-6">
                      <Project
                        repo={repo}
                        loading={loading}
                        github={sanitizedConfig.github}
                        googleAnalytics={sanitizedConfig.googleAnalytics}
                      />
                      <Blog
                        loading={loading}
                        googleAnalytics={sanitizedConfig.googleAnalytics}
                        blog={sanitizedConfig.blog}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <footer
                className={`p-4 footer ${bgColor} text-base-content footer-center`}
              >
                <div className="card compact bg-base-100 shadow">
                  <a
                    className="card-body"
                    href="https://github.com/Dev-Erf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div>
                      {loading ? (
                        skeleton({ width: 'w-52', height: 'h-6' })
                      ) : (
                        <p className="font-mono text-sm">
                          Made by{' '}
                          <span className="text-primary">Erfan</span> with
                          ❤️
                        </p>
                      )}
                    </div>
                  </a>
                </div>
              </footer>
            </Fragment>
          )
        )}
      </div>
    </HelmetProvider>
  );
};

GitProfile.propTypes = {
  config: PropTypes.shape({
    github: PropTypes.shape({
      username: PropTypes.string.isRequired,
      sortBy: PropTypes.oneOf(['stars', 'updated']),
      limit: PropTypes.number,
      exclude: PropTypes.shape({
        forks: PropTypes.bool,
        projects: PropTypes.array,
      }),
    }).isRequired,
    social: PropTypes.shape({
      linkedin: PropTypes.string,
      twitter: PropTypes.string,
      facebook: PropTypes.string,
      instagram: PropTypes.string,
      dribbble: PropTypes.string,
      behance: PropTypes.string,
      medium: PropTypes.string,
      dev: PropTypes.string,
      stackoverflow: PropTypes.string,
      website: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
    }),
    skills: PropTypes.array,
    experiences: PropTypes.arrayOf(
      PropTypes.shape({
        company: PropTypes.string,
        position: PropTypes.string,
        from: PropTypes.string,
        to: PropTypes.string,
      })
    ),
    education: PropTypes.arrayOf(
      PropTypes.shape({
        institution: PropTypes.string,
        degree: PropTypes.string,
        from: PropTypes.string,
        to: PropTypes.string,
      })
    ),
    blog: PropTypes.shape({
      source: PropTypes.string,
      username: PropTypes.string,
      limit: PropTypes.number,
    }),
    googleAnalytics: PropTypes.shape({
      id: PropTypes.string,
    }),
    hotjar: PropTypes.shape({
      id: PropTypes.string,
      snippetVersion: PropTypes.number,
    }),
    themeConfig: PropTypes.shape({
      defaultTheme: PropTypes.string,
      disableSwitch: PropTypes.bool,
      respectPrefersColorScheme: PropTypes.bool,
      hideAvatarRing: PropTypes.bool,
      themes: PropTypes.array,
      customTheme: PropTypes.shape({
        primary: PropTypes.string,
        secondary: PropTypes.string,
        accent: PropTypes.string,
        neutral: PropTypes.string,
        'base-100': PropTypes.string,
        '--rounded-box': PropTypes.string,
        '--rounded-btn': PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default GitProfile;
