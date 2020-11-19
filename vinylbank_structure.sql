-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 19, 2020 at 06:59 PM
-- Server version: 10.1.41-MariaDB-0+deb9u1
-- PHP Version: 5.5.9-1ubuntu4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vinylbank_structure`
--

-- --------------------------------------------------------

--
-- Table structure for table `bluray`
--

CREATE TABLE `bluray` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `actor` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `director` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `genre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int(4) NOT NULL,
  `lend` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `length` int(11) NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cd`
--

CREATE TABLE `cd` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `band` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `genre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int(11) NOT NULL,
  `lend` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `length` int(11) NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dvd`
--

CREATE TABLE `dvd` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `actor` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `director` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `genre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int(4) NOT NULL,
  `lend` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `length` int(11) NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `verified_email` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vinyl`
--

CREATE TABLE `vinyl` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `band` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `genre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int(11) NOT NULL,
  `lend` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `length` int(11) NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bluray`
--
ALTER TABLE `bluray`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cd`
--
ALTER TABLE `cd`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dvd`
--
ALTER TABLE `dvd`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vinyl`
--
ALTER TABLE `vinyl`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bluray`
--
ALTER TABLE `bluray`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cd`
--
ALTER TABLE `cd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dvd`
--
ALTER TABLE `dvd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vinyl`
--
ALTER TABLE `vinyl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
