-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 03, 2017 at 03:42 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.0.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_act`
--

-- --------------------------------------------------------

--
-- Table structure for table `exam`
--

CREATE TABLE `exam` (
  `id` bigint(11) NOT NULL,
  `exam_type` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `exam`
--

INSERT INTO `exam` (`id`, `exam_type`) VALUES
(1, 'entrance'),
(2, 'promotional');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` bigint(20) NOT NULL,
  `category_id` int(20) NOT NULL,
  `question` text NOT NULL,
  `answer` varchar(100) NOT NULL,
  `exam_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `category_id`, `question`, `answer`, `exam_id`) VALUES
(17, 1, 'The basic weapon of a police officer is?', 'Knowledge of the Law', 1),
(18, 1, 'Which of the following does not belong to the group?', 'Prostitution', 1);

-- --------------------------------------------------------

--
-- Table structure for table `question_categories`
--

CREATE TABLE `question_categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question_categories`
--

INSERT INTO `question_categories` (`id`, `category_name`) VALUES
(1, 'General Information'),
(2, 'Verbal Reasoning'),
(3, 'Quantitative Reasoning'),
(4, 'Logical Reasoning');

-- --------------------------------------------------------

--
-- Table structure for table `question_choices`
--

CREATE TABLE `question_choices` (
  `id` bigint(20) NOT NULL,
  `question_id` bigint(20) NOT NULL,
  `choice_name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question_choices`
--

INSERT INTO `question_choices` (`id`, `question_id`, `choice_name`) VALUES
(4, 17, 'Gun'),
(5, 17, 'Uniform'),
(6, 17, 'Whistle'),
(7, 17, 'Knowledge of the Law'),
(8, 18, 'Assassination'),
(9, 18, 'Bombing'),
(10, 18, 'Sabotage'),
(11, 18, 'Prostitution');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `birthdate` datetime NOT NULL,
  `password` text NOT NULL,
  `is_admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `birthdate`, `password`, `is_admin`) VALUES
(4, 'Admin', 'Admin', 'admin@gmail.com', '2017-08-03 13:13:46', '$2y$10$9yBTLRaA.nxBUDB5PR0XAuDZz7TNmpBXQadnH/PaRB1qUMfE07Vp2', 0),
(5, 'Rowegie', 'Lambojon', 'rlambojon@gmail.com', '1997-09-19 05:37:21', '$2y$10$Ry.6/DRR1.vrn5qK15QD9eXI9OC0JlwK2ixJ3N4OKeuUc6AJtYCZu', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_exam_id` (`exam_id`),
  ADD KEY `fk_category_id` (`category_id`);

--
-- Indexes for table `question_categories`
--
ALTER TABLE `question_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question_choices`
--
ALTER TABLE `question_choices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_question_id` (`question_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exam`
--
ALTER TABLE `exam`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `question_categories`
--
ALTER TABLE `question_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `question_choices`
--
ALTER TABLE `question_choices`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `question_categories` (`id`),
  ADD CONSTRAINT `fk_exam_id` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`id`);

--
-- Constraints for table `question_choices`
--
ALTER TABLE `question_choices`
  ADD CONSTRAINT `fk_question_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
